// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, objectID} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url,function(err,client){
  if (err) {
    return console.log('Unable to connect to MongoDb server.');
  }
  console.log('connected to MongoDB Server.');
  const db = client.db(dbName);
//delete many
  // db.collection('Todos').deleteMany({text:'learn node'}).then((result)=>{
  //   console.log(result);
  // });
//delete insertOne
//findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed:true}).then((result)=>{
    console.log(result);
  });
  // db.collection('Todos').findOneAndDelete({_id:new objectID('34567890987675')}).then((result)=>{
  //   console.log(result);
  // });



  client.close();
});
