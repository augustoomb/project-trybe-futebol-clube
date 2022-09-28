import * as jwt from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import UserModel from '../database/models/UserModel';
import UserLogin from '../interfaces/userLogin.interface';

class JwtTokenHelpers {
  public secret = process.env.JWT_SECRET || 'minhaSenhaSecreta';

  public async createToken(payload: User) {
    const token = await jwt.sign({ payload }, this.secret, { algorithm: 'HS256', expiresIn: '7d' });
    return token;
  }

  public verifyToken(token: string): User | UserLogin | any {
    try {
      const data = jwt.verify(token, this.secret);
      return data as User | UserLogin;
    } catch (error) {
      return error;
    }
  }
}

export default JwtTokenHelpers;
