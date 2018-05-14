const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ranjeet_:pass@baLm1@ds119070.mlab.com:19070/mydb-node || mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose : mongoose
}
