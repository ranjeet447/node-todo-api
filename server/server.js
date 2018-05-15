require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');
var {ObjectID} = require('mongodb')

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
      text : req.body.text
    });

    todo.save().then((doc)=>{
      res.send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({
      todos:todos
    });
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!(ObjectID.isValid(id))){
    return res.status(400).send('Invalid Id.')
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo:todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!(ObjectID.isValid(id))){
    return res.status(400).send('Invalid Id.')
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send('Id not found');
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res)=>{
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

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send('Id not found');
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
});




var port = process.env.PORT || 3000;
app.listen(port,function () {
  console.log(`Server up on Port ${port}`);
});

module.exports = {
  app
}
