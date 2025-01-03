import express from 'express';
import UserController from "../Controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

// User preferences
router.post('/users/:userId/preferences', userController.addUserPreference);
router.put('/users/:userId/preferences', userController.updateUserPreferences);
router.get('/users/:userId/preferences', userController.getUserPreferences);
router.delete('/users/:userId/preferences', userController.removeUserPreference);

// Authentication services
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

export default router;