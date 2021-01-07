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
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

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

export default router;
