const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { Location, Collection } = require("../db/models");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateLocation = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("Name is required and must be less than 255 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage(
      "Description is required and must be less than 255 characters"
    ),
  check("street")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("Street is required and must be less than 255 characters"),
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("City is required and must be less than 255 characters"),
  check("state")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("State is required and must be less than 255 characters"),
  check("country")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("Country is required and must be less than 255 characters"),
  check("activity_type")
    .exists({ checkFalsy: true })
    .withMessage("Type is required"),
  check("zip_code")
    .exists({ checkFalsy: true })
    .withMessage("Zip Code is required")
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage("Zip code must be in the format 12345 or 12345-6789"),
  check("latitude")
    .isNumeric()
    .withMessage("Latitude must be a number between -90 and 90"),
  check("longitude")
    .isNumeric()
    .withMessage("Longitude must be a number between -90 and 90"),

  check("activity_type").custom(async (activity_type, { req }) => {
    if (req.method === "POST") {

      const { latitude, longitude } = req.body;
      const existingLocation = await Location.findOne({
        where: {
          activity_type,
          latitude,
          longitude,
        },
      });
      if (existingLocation) {
        throw new Error(
          "A location with the same type and longitude/latitude already exists"
        );
      }
    }
  }),
  handleValidationErrors,
];

//Validate Signup Request Body
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("First Name is required."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Last Name is required."),
  handleValidationErrors,
];

const validateCollection = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("Name is required and be must less than 255 characters"),
  check("imageUrl")
    .exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("ImageUrl is required and be must less than 255 characters")
    .isURL()
    .withMessage("Image URL must be a valid URL"),
  handleValidationErrors,
];

const validateCollectionLocation = [
  check("collectionId")
    .exists({ checkFalsy: true })
    .withMessage("Collection ID is required")
    .isInt()
    .withMessage("Collection ID must be an integer")
    .custom(async (value) => {
      const collection = await Collection.findByPk(value);
      if (!collection) {
        throw new Error("Collection not found");
      }
    }),
  check("locationId")
    .exists({ checkFalsy: true })
    .withMessage("Location ID is required")
    .isInt()
    .withMessage("Location ID must be an integer")
    .custom(async (value) => {
      const location = await Location.findByPk(value);
      if (!location) {
        throw new Error("Location not found");
      }
    }),
  handleValidationErrors,
];

module.exports = {
  validateLocation,
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateCollection,
  validateCollectionLocation,
};
