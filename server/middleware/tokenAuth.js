import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenAuthentication = {
  token(request, response, next) {
    try {
      const decode = jwt.verify(request.body.token, process.env.SECRET_JWT_KEY);
      request.userid = decode;
      next();
    } catch (error) {
      response.status(401).json({
        message: 'Authentication Failed',
        err: error,
      });
    }
  },
};


export default tokenAuthentication;
