import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';
import users from './server/routes/users';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.use('/api/v1/auth', users);

app.use((request, response, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, request, response, next) => {
  response.status(error.status);
  response.json({
    error: { message: error.message },
  });
});

const server = app.listen(port, () => {
  console.log('server is running on port', port);
});

export function closeServer() {
  server.close();
}
export default app;
