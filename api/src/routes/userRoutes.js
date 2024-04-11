const express = require('express');

const userRouter = express.Router();

const { getUsers, getUserById, createUser } = require('../controllers/userControllers');

userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:id', getUserById);

module.exports = userRouter;