import { mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function initializeTestingMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri);
    }
  });
}

export default initializeTestingMongoServer;
