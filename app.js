import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import logger from 'morgan';
import './DataBase/mongoConfig.js';
import './Passportjs/strategies.js';
import messageRouter from './Routes/usersRoutes/messages.js';
import userRouter from './Routes/usersRoutes/users.js';
import groupChatRouter from './Routes/usersRoutes/groupChats.js';
import allRouter from './Routes/usersRoutes/all.js';

// initializeTestingMongoServer();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options('*', cors());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //! change when deploy
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/messages', messageRouter);
app.use('/users', userRouter);
app.use('/groupChats', groupChatRouter);
app.use('/all', allRouter);

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  res.status(err.status || 500).send(err);
});

app.listen(process.env.PORT, () => console.log('app listening on port 3000!'));
