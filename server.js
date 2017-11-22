const express = require("express");
let app = express();

app.use('/', express.static('site'));

const PORT = 8080;
const IP = '127.0.0.1';

app.listen(PORT, IP, () => {
    console.log(`${IP}:${PORT}`);
});