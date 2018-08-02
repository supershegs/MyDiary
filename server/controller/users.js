import userModel from '../models/users';
import bcrypt from 'bcrypt';

const users = {
  createUser(request, response) {
    const user = userModel.users(request.body);
    const name = request.body.username;
    const pass = request.body.password;
    if (name.length === 0 || request.body.name.length === 0) {
      return response.status(404).json({ error: 'Sign up failed check the your username' });
    } if (pass.length === 0) {
      return response.status(404).json({ error: 'Sign up failed, please fill the password' });
    }
    response.status(201).json({ message: 'Successfully added' });
    return user;
  },
  authUser(request, response, err) {
    const auth = userModel.signin(request.body);
    const nam = request.body.username;
    const pas = request.body.password;
    if (nam.length === 0 || pas.length === 0) {
      return response.status(404).json({ error: 'please filled in the correct details' });
    }
    response.status(200).json({ message: 'Authetication successful' });
    return auth;
  },
};

export default users;
