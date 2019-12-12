const express = require('express');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto
} = require('./../controllers/userController');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePasword,
  protect,
  restrictTo,
  logout
} = require('./../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
userRouter.use(protect);

userRouter.patch('/updateMyPassword', updatePasword);
userRouter.patch('/updateMe', uploadUserPhoto, updateMe);
userRouter.patch('/deleteMe', deleteMe);

userRouter.get('/me', getMe, getUser);

userRouter.use(restrictTo('admin'));
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
