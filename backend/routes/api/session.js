const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
// const { check } = require('express-validator');
const { validateLogin } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;


    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if(!credential || !password) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: {
          credential: 'Email or username is required',
          password: 'Password is required'
        }
      })
    }

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const error = new Error('Invalid Credentials')
      error.message = 'Invalid Credentials',
      error.status = 401
      return next(error)
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };


    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get('/', (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return res.json({
      user: safeUser
    });
  } else return res.json({ user: null });
});


// router.get(
//   '/',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       };
//       return res.json({
//         user: safeUser
//       });
//     } else {
//       return res.json({ user: null });
//     }
//   }
// );

module.exports = router;
