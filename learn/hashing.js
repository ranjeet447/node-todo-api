const jwt = require('jsonwebtoken');

var data = {
  id:10
}

var token = jwt.sign(data,'saltSecret');
console.log(token);

var decoded = jwt.verify(token,'saltSecret');
console.log(decoded);
