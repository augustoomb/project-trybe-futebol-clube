import * as jwt from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import UserModel from '../database/models/UserModel';
import UserLogin from '../interfaces/userLogin.interface';

class JwtTokenHelpers {
  public secret = process.env.JWT_SECRET || 'minhaSenhaSecreta';

  public createToken(payload: User) {
    const token = jwt.sign({ payload }, this.secret, { algorithm: 'HS256', expiresIn: '7d' });
    return token;
  }

  // public verifyToken(token: string) {
  //   try {
  //     const data = jwt.verify(token, this.secret);
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

export default JwtTokenHelpers;
