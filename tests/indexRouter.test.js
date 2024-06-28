import indexRouter from '../Routes/usersRoutes/index.js';
import express from 'express';
import request from 'supertest';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

test('index route works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});

test('testing route works', (done) => {
  request(app)
    .post('/test')
    .type('form')
    .send({ item: 'hello' })
    .then(() => {
      request(app)
        .get('/test')
        .expect({ array: ['hello'] }, done);
    });
});
