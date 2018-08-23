import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenAuthentication = {
  token(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.SECRET_JWT_KEY);
      return decode;
    } catch (error) {
      return response.status(401).json({
        message: 'Authentication Failed',
        err: error,
      });
    }
  },
};


export default tokenAuthentication;
