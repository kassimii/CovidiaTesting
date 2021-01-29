import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';

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
    if (req.body.password) {
      user.password = req.body.password;
    }

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
    user.isAdmin = req.body.isAdmin;
    user.isLabWorker = req.body.isLabWorker;
    user.isPrelevationWorker = req.body.isPrelevationWorker;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
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
  const { name, email, isAdmin, isPrelevationWorker, isLabWorker } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }

  var randomPassword = Math.random().toString(36).slice(-8);

  const user = await User.create({
    name,
    email,
    password: randomPassword,
    isPrelevationWorker,
    isLabWorker,
  });

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.TRANSPORTER_EMAIL}`,
      pass: `${process.env.TRANSPORTER_PASS}`,
    },
    tls: {
      rejectUnauthorized: false,
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
      console.log('Eroare' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isPrelevationWorker: user.isPrelevationWorker,
      isLabWorker: user.isLabWorker,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
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
};
