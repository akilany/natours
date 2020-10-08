const Review = require('../models/reviewModel')
// const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')

// Middleware for create new review on tour
exports.setTourUserIDs = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id
  if (!req.body.tour) req.body.tour = req.params.tourId

  next()
}

exports.getReviews = factory.getAll(Review)
exports.getSingleReview = factory.getOne(Review)
exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)
