const express = require('express');
const tourRouter = express.Router();

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('./../controllers/tourController');

const authController = require('./../controllers/authController');

const reviewRouter = require('./../routes/reviewRoutes');

const { protect, restrictTo } = require('./../controllers/authController');

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.route('/monthy-plan/:year').get(getMonthlyPlan);

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter
  .route('/')
  .get(protect, getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// tourRouter
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('users'),
//     reviewController.createReview
//   );

module.exports = tourRouter;
