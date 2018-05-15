// const expect = require('expect');
 const request = require('supertest');
 const {ObjectID} = require('mongodb');
//
 const {app} = require('./../server');
 const {Todo} = require('./../models/todo');
 const {todos,populateTodos,users,populateUsers} = require('./seed/seed')



beforeEach(populateTodos);
beforeEach(populateUsers);
// test('sample test',()=>{
//   expect(2).toBe(2);
// })

  describe('POST /todo',()=>{
    test('should create a new todo', (done) => {
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
    });

    test('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        });
    });
  });

describe('GET /todo',()=>{
  test('get all todos',(done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
  });
});

describe('GET /todo/:id',()=>{
  test('should return todo with id',(done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
});

describe('DELETE /todo/:id',()=>{
  test('should delete todo by id',(done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
      }).end(done);
      //checkig the dataabse for thr deleted id
      Todo.findById(hexId).then((todo)=>{
        expect(todo).toNotExist;
        done();
      }).catch((e)=>{
        done(e);
      });
  });

  test('return id no found if id not present',(done)=>{
    var hexId = new ObjectID();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
//
//   test('return invalid Id',(done)=>{
//     request(app)
//       .delete('todos/asdfg')
//       .expect(400)
//       .end(done);
//   });
 });

 // describe('PATCH /todos/:id',()=>{
 //   test('should update todo',(done)=>{
 //     var hexId = todos[0]._id.toHexString();
 //     var text = 'this is updated text';
 //     request(app)
 //      .patch(`/todo/${hexId}`)
 //      .send({
 //        completed:true,
 //        text
 //      })
 //      .expect(200)
 //      .expect((res)=>{
 //        expect(res.body.todo.text).toBe(text);
 //        expect(res.body.todo.completed).toBe(true);
 //        expect(res.body.todo.completedAt).toBe(number);
 //      })
 //      .end(done);
 //   });
 // });
