import userModel from '../models/users';

const users = {
  createUser(request, response) {
    const user = userModel.users(request.body);
    return response.send(user);
  },
};

export default users;
