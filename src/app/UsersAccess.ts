import * as dbConnection from './DateBaseConnector';
import { User } from './UsersModel';

export class UsersAccess {
  public async connectToDb() {
    await dbConnection.connect();
  }

  public async closeDbConnection() {
    await dbConnection.close();
  }

  public async addUser(user: User) {
    const userId = dbConnection.addUser(user);
    return userId;
  }

  public async getUser(userId: string) {
    const user = dbConnection.getUser(userId);
    return user;
  }

  public async getUsers() {
    const users = dbConnection.getUsers();
    return users;
  }
}
