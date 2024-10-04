import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { User } from './UsersModel';

const dbUri = 'mongodb://localhost:27017/mydatabase';
const dbName = 'mydatabase';

let usersCollection: Collection<User>;

const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to your MongoDb.'
    );
    const dataBase = client.db(dbName);
    usersCollection = dataBase.collection<User>('users');
  } catch (error) {
    console.error(error);
  }
}

export async function close() {
  await client.close();
}

export async function addUser(user: User) {
  const result = await usersCollection.insertOne(user);
  return result.insertedId.toString();
}

export async function getUser(id: string) {
  return await usersCollection.findOne({ _id: new ObjectId(id) });
}

export async function getUsers() {
  return await usersCollection.find().toArray();
}
