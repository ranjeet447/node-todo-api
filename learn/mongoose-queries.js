const {ObjectId} = require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = "5af9ea8671c7922198361e43";
//
if (!(ObjectId.isValid(id))) {
  console.log('Id not valid.');
}

Todo.find({
  _id: id
}).then((todos)=>{
  console.log("Todos",todos);
});

 Todo.findOne({
   _id:id
 }).then((todo)=>{
   console.log("Todo",todo);
 });

Todo.findById(id).then((todo)=>{
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id',todo);
});

User.findById('5af89f28061eaf4104d1941a').then((user)=>{
  if(!user){
    return console.log('user not found');
  }
  console.log('User by Id',user);
})
