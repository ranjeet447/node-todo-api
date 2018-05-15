const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = '1234asdf';

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});

var hashedPassword  = '$2a$10$PPjg9KNoOKx1NpZvyKoLee1cgZ2xzDZObpqzHcjo5Q6V1ZQPYh2Cu';
bcrypt.compare(password,hashedPassword,(err,result)=>{
  console.log(result);
})

var data = {
  id:10
}

var token = jwt.sign(data,'saltSecret');
console.log(token);

var decoded = jwt.verify(token,'saltSecret');
console.log(decoded);
