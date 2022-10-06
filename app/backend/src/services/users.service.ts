import UserLogin from '../interfaces/userLogin.interface';
import UserModel from '../database/models/UserModel';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';

class UserService {
  model = UserModel;
  jwt = new JwtTokenHelpers();

  public async login(userLogin: UserLogin) {
    try {
      const user = await this.model.findOne({ where: { email: userLogin.email } });
      if (user !== null) {
        const token = this.jwt.createToken(user);
        return token;
      } else {
        return false;
      }
    } catch (error) {
      const objError = error as Error;
      console.log(objError.message);
    }
  }

}

export default UserService;