import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      isLabWorker: user.isLabWorker,
      isPrelevationWorker: user.isPrelevationWorker,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      isLabWorker: user.isLabWorker,
      isPrelevationWorker: user.isPrelevationWorker,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Update user profile
//@route PUT /api/users/profile/:id
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
      isLabWorker: updatedUser.isLabWorker,
      isPrelevationWorker: updatedUser.isPrelevationWorker,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Get all users
//@route GET /api/users/
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.isAdmin = req.body.isAdmin;
    user.isLabWorker = req.body.isLabWorker;
    user.isPrelevationWorker = req.body.isPrelevationWorker;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      isAdmin: updatedUser.isAdmin,
      isLabWorker: updatedUser.isLabWorker,
      isPrelevationWorker: updatedUser.isPrelevationWorker,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Create a user
//@route POST /api/users
//@access Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    isAdmin,
    isPrelevationWorker,
    isLabWorker,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error('Există deja un utilizator cu această adresă de email.');
  }

  var randomPassword = Math.random().toString(36).slice(-8);

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: randomPassword,
    isAdmin,
    isPrelevationWorker,
    isLabWorker,
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_EMAIL}`,
      pass: `${process.env.TRANSPORTER_PASS}`,
    },
  });

  var mailOptions = {
    from: `CovidTesting <${process.env.TRANSPORTER_EMAIL}>`,
    to: email,
    subject: 'Cont creat pe platforma CovidTesting',
    text: `
    Email: ${email} 
    Parola: ${randomPassword}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    } else {
      console.log('Email sent: ' + info.response);

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          isPrelevationWorker: user.isPrelevationWorker,
          isLabWorker: user.isLabWorker,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    }
  });
});

//@desc Send reset password link
//@route POST /api/users/forgot-password
//@access Public
const sendResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.find({ email: req.body.email });

  if (user[0]) {
    const resetSecret = process.env.JWT_SECRET + user[0].password;

    const payload = {
      email: user[0].email,
      id: user[0]._id,
    };

    const resetToken = jwt.sign(payload, resetSecret, { expiresIn: '15m' });
    const resetLink = `http://${process.env.URL}/resetare-parola/${user[0]._id}/${resetToken}`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.TRANSPORTER_EMAIL}`,
        pass: `${process.env.TRANSPORTER_PASS}`,
      },
    });

    var mailOptions = {
      from: `CovidTesting <${process.env.TRANSPORTER_EMAIL}>`,
      to: user[0].email,
      subject: 'Resetarea parolei',
      html: `<p>Pentru a reseta parola apăsați aici: <a href=${resetLink}>Resetare parolă</a></p> `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(250).send(info.response);
      }
    });
  } else {
    res.status(404);
    throw new Error('User with given email not found');
  }
});

//@desc Update password in db
//@route POST /api/users/reset-password/:userId/:token
//@access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const user = await User.findById(userId);

  if (user) {
    const resetSecret = process.env.JWT_SECRET + user.password;

    try {
      const payload = jwt.verify(token, resetSecret);

      user.password = req.body.password;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isLabWorker: updatedUser.isLabWorker,
        isPrelevationWorker: updatedUser.isPrelevationWorker,
        token: generateToken(updatedUser._id),
      });
    } catch (error) {
      res.send(error.message);
      return;
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//verify if reset password link is still available
const verifyResetLink = asyncHandler(async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findById(userId);

  if (user) {
    const resetSecret = process.env.JWT_SECRET + user.password;

    try {
      const payload = jwt.verify(token, resetSecret);
      res.sendStatus(200);
    } catch (error) {
      res.send(error.message);
      return;
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  sendResetPasswordLink,
  resetPassword,
  verifyResetLink,
};
