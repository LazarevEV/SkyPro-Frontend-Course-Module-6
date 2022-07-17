const User = require('../models/user');
const Book = require('../models/book');

// Получем всех пользователей из БД
const getUsers = (req, res) => {
    return User.find({})
        .then(users => res.status(200).send(users))
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Получем пользователя по ID
const getUser = (req, res) => {
    console.log(req.params);
    const id = {'id': req.params.id};
    return User.findOne(id)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Получаем ID книг, которые находятся у пользователя
const getUserBooks = (req, res) => {
    const id = {'userId': req.params.id};
    return Book.find(id)
        .then((books) => {
            res.status(200).send(books);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Создаем пользователя
const createUser = (req, res) => {
    console.log(req.body)
    return User.create({ ...req.body })
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
};

// Обновляем пользователя
const updateUser = (req, res, next) => {
    const id = {'id': req.params.id};
    User.findOneAndUpdate(id, {...req.body })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
}

// Удаляем пользоватедя
const deleteUser = (req, res, next) => {
    const {id} = req.params;
    User.deleteOne({"id": id})
        .then((dbResponse) => {
            res.status(200).send(dbResponse);
        })
        .catch(() => {
            res.status(500).send({'message': 'Something went wrong!'})
        });
}

module.exports = {
    getUsers,
    getUser,
    getUserBooks,
    createUser,
    updateUser,
    deleteUser
};