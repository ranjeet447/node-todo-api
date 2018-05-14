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
  // db.collection('Todos').find({completed:false}).toArray().then((docs) =>{
  //   console.log('Todos \n');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Unable to fetch data.');
  // });
  // db.collection('Todos').find().count().then((count) =>{
  //   console.log('Todos',count);
  // },(err)=>{
  //   console.log('Unable to fetch data.');
  // });
  //
  // db.collection('Todos').find().toArray().then((docs) =>{
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Unable to fetch data.');
  // });

  db.collection('Users').find({name:'Ranjeet kumar'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('Unable to fetch data.');
  });


  client.close();
});
