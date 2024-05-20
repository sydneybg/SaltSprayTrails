const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Location } = require('../db/models');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


const validateLocation = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
  check('type')
    .exists({ checkFalsy: true })
    .withMessage('Type is required'),
  check('latitude')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is required')
    .isNumeric()
    .withMessage('Latitude must be a number'),
  check('longitude')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is required')
    .isNumeric()
    .withMessage('Longitude must be a number'),
  check('type').custom(async (type, { req }) => {
    const { latitude, longitude } = req.body;
    const existingLocation = await Location.findOne({
      where: {
        type,
        latitude,
        longitude,
      },
    });
    if (existingLocation) {
      throw new Error('A location with the same type and longitude/latitude already exists');
    }
  }),
];

//Validate Signup Request Body
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('First Name is required.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Last Name is required.'),
  handleValidationErrors
];


module.exports = {
  validateLocation,
  handleValidationErrors,
  validateLogin,
  validateSignup
};
