import mongoose from 'mongoose';

// Import models here
import Users from './users';

const connectDb = async () => {
  return await mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  ).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

const models = {
  // "list" models here
  Users,
};

export { connectDb };
export default models;