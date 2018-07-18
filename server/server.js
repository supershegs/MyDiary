import express from 'express';

const imports = {};
export { imports };

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('API now is running');
});

const server = app.listen(port, () => {
    console.log('server is running on port', port);
});

export function closeSever() {
    server.close();
}