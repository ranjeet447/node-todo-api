const MongoClient = require('mongodb').MongoClient;
// const {mongodbClient, objectID} = require('mongodb');

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

  // db.collection('Todos').insert({
  //   'text':'some text',
  //   'completed':false
  // },function(err,results){
  //   if (err) {
  //     return console.log('Unable to insert data \n,err');;
  //   }
  //
  //   console.log(JSON.stringify(results.ops,undefined, 2));
  // });
  db.collection('Users').insertOne({
    'name':'Ranjeet kumar',
    'age':20,
    'location':"Bangalore"
  },function (err,results) {
    if (err) {
      return console.log('Unable to insert data\n',err);;
    }
    console.log(JSON.stringify(results.ops,undefined,2));
    console.log(results.ops[0]._id.getTimestamp());
  });

  client.close();
});
