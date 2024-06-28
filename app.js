import express from 'express';
import 'dotenv/config';
import logger from 'morgan';
import './DataBase/mongoose.js';
import indexRouter from './Routes/usersRoutes/index.js';
import initializeMongoServer from './DataBase/mongoConfig.js';

import './Passportjs/strategies.js';
import cors from 'cors';
import initializeTestingMongoServer from './tests/mongoConfigTesting.js';
// initializeMongoServer()
initializeTestingMongoServer();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options('*', cors());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //! change when deploy
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', indexRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  res.status(err.status || 500).send(err);
});

app.listen(process.env.PORT, () => console.log('app listening on port 3000!'));
