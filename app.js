const app = require('express')();

const host = '127.0.0.1';
const port = 7000;

app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
