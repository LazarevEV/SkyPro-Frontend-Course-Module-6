const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const corsMiddlewear = require('./middlewears/cors')

const {getUsers, getUser, getUserBooks, createUser, updateUser, deleteUser} = require('./controllers/user')
const {getBooks, getBook, getBookUser, createBook, updateBook, deleteBook} = require('./controllers/book')

dotenv.config();
const { PORT=3003, API_URL='http://localhost', MONGODB_URL='mongodb://localhost:27017/SkyProFrontendModule6?directConnection=true' } = process.env;
const app = express();

mongoose.connect(MONGODB_URL, {
	useNewUrlParser: true,
    useUnifiedTopology: true,
	// useCreateIndex: true,
	// useFindAndModify: false
})

app.use('/', corsMiddlewear);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (request, response) => {
    response.status(200);
    response.send(`Hello, World!`);
 });
app.get('/users', getUsers);
app.post('/users', createUser);
app.get('/users/:id', getUser);
app.patch('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users/:id/books', getUserBooks);

app.get('/books', getBooks);
app.post('/books', createBook);
app.get('/books/:id', getBook);
app.patch('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.get('/books/:id/user', getBookUser)

app.get("*", function (req, res) {
    return res.status(404).send({
        message: 'Unknown entity!'
    });
});

app.listen(PORT, () => {
    console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});