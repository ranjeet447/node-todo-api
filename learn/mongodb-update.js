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

  db.collection('Todos').findOneAndUpdate({text:'learn node'},{
    $set:{
      completed:true
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });


  client.close();
});
