import UserLogin from '../interfaces/userLogin.interface';
import UserModel from '../database/models/UserModel';
import User from '../interfaces/user.interface';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
import { compareSync } from 'bcryptjs';
// import * as bcrypt from 'bcryptjs';
// import { NotFoundError } from 'restify-errors';

class UserService {
  model = UserModel;
  jwt = new JwtTokenHelpers();

  public async login(userLogin: UserLogin): Promise<any> {
    const user = await this.model.findOne({ where: { email: userLogin.email } });
    // if (user !== null && this.comparePassword(userLogin.password, user.password)) {
    if (user !== null) {
      const token = this.jwt.createToken(user);
      return token;
      // const compPass = this.comparePassword(userLogin.password, user.password);
      // compPass ? await this.jwt.createToken(user as User) : false;
    } else {
      return false;
    }
  }

  // public async getAll(): Promise<User | unknown> {
  //   const users = await this.model.findAll();

  //   return users;
  // }

  // public comparePassword = (receivedPass: string, passDatabase: string): boolean => {
  //   return compareSync(receivedPass, passDatabase);
  // }

}

export default UserService;