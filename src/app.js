const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT = 3003, API_URL = 'http://localhost' } = process.env;

const app = express();

app.get('/', (request, response) => {
    response.status(200);
    response.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});