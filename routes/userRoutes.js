const express = require('express');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} = require('./../controllers/userController');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePasword,
  protect
} = require('./../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.patch('/updateMyPassword', protect, updatePasword);
userRouter.patch('/updateMe', protect, updateMe);
userRouter.patch('/updateMe', protect, updateMe);
userRouter.patch('/deleteMe', protect, deleteMe);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
