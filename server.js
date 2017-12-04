const express = require("express");

let app = express();

app.use('/', express.static('site'));

const PORT = process.env.PORT || 8080;
const IP = '192.168.15.18'; //'127.0.0.1';

app.listen(PORT, () => {
    console.log(`${IP}:${PORT}`);
});