import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', routes);

const server = app.listen(port, () => {
  console.log('server is running on port', port);
});

export function closeServer() {
  server.close();
}
export default app;
