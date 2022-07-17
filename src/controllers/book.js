const Book = require('../models/book');

// Получем всех пользователей из БД
const getBooks = (req, res) => {
    return Book.find({})
        .then(Books => res.status(200).send(Books))
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Получаем пользователя по ID
const getBook = (req, res) => {
    const id = {'id': req.params.id};
    return Book.findOne(id)
        .then((book) => {
            res.status(200).send(book);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Получаем ID пользователя, кто взял книгу, по ее ID
const getBookUser = (req, res) => {
    const id = {'id': req.params.id};
    return Book.findOne(id)
        .then((book) => {
            res.status(200).send({'userId': book.userId});
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Создаем пользователя
const createBook = (req, res) => {
    return Book.create({ ...req.body })
        .then((Book) => {
            res.status(201).send(Book);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Обновляем пользователя
const updateBook = (req, res, next) => {
    const id = {'id': req.params.id};
    Book.findOneAndUpdate(id, {...req.body })
        .then((Book) => {
            res.status(200).send(Book);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
}

// Удаляем пользоватедя
const deleteBook = (req, res, next) => {
    const {id} = req.params;
    Book.deleteOne({"id": id})
        .then((dbResponse) => {
            res.status(200).send(dbResponse);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
}

module.exports = {
    getBooks,
    getBook,
    getBookUser,
    createBook,
    updateBook,
    deleteBook
};