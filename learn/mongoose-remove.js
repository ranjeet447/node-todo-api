const {ObjectId} = require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = "5af9ea8671c7922198361e43";
//
if (!(ObjectId.isValid(id))) {
  console.log('Id not valid.');
}

//remove all documents
// Todo.remove({}).then((result)=>{
//   console.log(result);
// });
Todo.findOneAndRemove({_id:'5afaf224960cbcdeff54ec77'}).then((todo)=>{
  console.log(todo);
});

Todo.findByIdAndRemove('5afaf224960cbcdeff54ec77').then((todo)=>{
  console.log(todo);
});
