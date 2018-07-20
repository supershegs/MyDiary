import express from 'express';
import path from 'path';
import expressHBS from 'express-handlebars';
import firstApi from './routes/ver_Api_1/index';
// import secondApi from './routes/ver_Api_2/index';
 
const app = express();
const port = 3000;

 
app.engine('handlebars', expressHBS({ defaultLayout: 'header' }));
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/v1', firstApi);
// app.use('/api/v2', secondApi);
 

const server = app.listen(port, () => {
    console.log('server is running on port', port);
});

export function closeSever() {
    server.close();
}
export default app;