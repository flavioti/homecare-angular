const express = require("express");

let app = express();

app.use('/', express.static('site'));

const PORT = process.env.PORT || 8080;
const IP = '192.168.15.13'; //'127.0.0.1';

console.log(process.env.NODE_ENV);

if ('development' === process.env.NODE_ENV) {
    console.log('Executando no ambiente de desenvolvimento');
    app.listen(PORT, IP, () => {
        console.log(`${IP}:${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`${PORT}`);
    });
};