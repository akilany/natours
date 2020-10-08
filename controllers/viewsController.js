const Tour = require('../models/tourModel')
const Booking = require('../models/bookingModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find()

  // 2) Build template (DONE)

  // 3) Render template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  })

  if (!tour) return next(new AppError('There is no tour with that name.', 404))

  // 2) Build template (DONE)
  // 3) Render template using tour data from 1)
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  })
})

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Account',
  })
}

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all booking
  const bookings = await Booking.find({ user: req.user.id })

  // 2) Find tours with the returned ID
  const tourIDs = bookings.map((booking) => booking.tour)
  const tours = await Tour.find({ _id: { $in: tourIDs } })

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  })
})

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  })
}

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
  })
}
