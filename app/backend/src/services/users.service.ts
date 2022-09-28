import UserLogin from '../interfaces/userLogin.interface';
import UserModel from '../database/models/UserModel'
import User from '../interfaces/user.interface';
var bcrypt = require('bcryptjs');
// import { NotFoundError } from 'restify-errors';

class UserService {
  model = UserModel;

  public async login(userLogin: UserLogin): Promise<any> {
    const user: unknown | UserModel = await this.getByEmail(userLogin);

    if (user instanceof UserModel) {
      // return bcrypt.compareSync(userLogin.password, user.password)
      return true;
    } else {
      return false;
    }
  }

  public async getAll(): Promise<User | unknown> {
    const users = await this.model.findAll();

    return users;
  }

  private async getByEmail(userLogin: UserLogin): Promise<User | unknown> {
    return await this.model.findOne({ where: { email: userLogin.email } })
  }

  // private comparePassword = (receivedPass: string, passDatabase: string): boolean => {
  //   return bcrypt.compareSync(receivedPass, passDatabase);
  // }
}

export default UserService;