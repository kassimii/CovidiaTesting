import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/verify-reset-link', verifyResetLink);
router
  .route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.post('/forgot-password', sendResetPasswordLink);
router.post('/reset-password/:userId/:token', resetPassword);

export default router;
