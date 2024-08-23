const express = require('express');
const { getProfile, updateProfile, getAllUsers, blockUser, unblockUser } = require('../handlers/user');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

let userRouter = express.Router();

userRouter.get('/profile', isAuth, getProfile);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.get('/manage', isAdmin, getAllUsers);
userRouter.patch('/block/:id', isAdmin, blockUser);
userRouter.patch('/unblock/:id', isAdmin, unblockUser);

module.exports = userRouter;
