import UserLogin from '../interfaces/userLogin.interface';
import UserModel from '../database/models/UserModel';
import User from '../interfaces/user.interface';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
// var bcrypt = require('bcryptjs');
// import { NotFoundError } from 'restify-errors';

class UserService {
  model = UserModel;
  jwt = new JwtTokenHelpers();

  public async login(userLogin: UserLogin): Promise<any> {
    // const user = await this.getByEmail(userLogin.email);
    const user = await this.model.findOne({ where: { email: userLogin.email } });
    if (user === null) {
      return false;
    } else {
      const token = await this.jwt.createToken(user as User);
      return token;
    }
  }

  public async getAll(): Promise<User | unknown> {
    const users = await this.model.findAll();

    return users;
  }

  // public async getByEmail(email: string): Promise<User | unknown> {
  //   return await this.model.findOne({ where: { email } })
  // }

  // private comparePassword = (receivedPass: string, passDatabase: string): boolean => {
  //   return bcrypt.compareSync(receivedPass, passDatabase);
  // }
}

export default UserService;