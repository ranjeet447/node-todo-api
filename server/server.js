require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
var {ObjectID} = require('mongodb')


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
    var todo = new Todo({
      text : req.body.text,
      _creator:req.user._id
    });

    todo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});

app.get('/todos', authenticate,(req,res)=>{
  Todo.find({
    _creator:req.user._id
  }).then((todos)=>{
    res.send({
      todos:todos
    });
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;

  if(!(ObjectID.isValid(id))){
    return res.status(400).send('Invalid Id.')
  }
  Todo.findOne({
    _id:id,
    _creator:res.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo:todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  if(!(ObjectID.isValid(id))){
    return res.status(400).send('Invalid Id.')
  }
  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send('Id not found');
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!(ObjectID.isValid(id))){
    return res.status(400).send('Invalid Id.')
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id:id,_creator:req.user._id  },{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send('Id not found');
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
});

app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then((user)=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});


app.get('/user/me', authenticate ,function(req,res){
  res.send(req.user)
});

app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user)=>{
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
      });
    }).catch((e)=>{
      //user not found
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


var port = process.env.PORT || 3000;
app.listen(port,function () {
  console.log(`Server up on Port ${port}`);
});

module.exports = {
  app
}
