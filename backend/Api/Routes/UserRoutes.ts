import express from 'express';
import UserController from "../Controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// User preferences
router.post('/users/:id/preferences', userController.addUserPreference);
router.put('/users/:id/preferences', userController.updateUserPreferences);
router.get('/users/:id/preferences', userController.getUserPreferences);
router.delete('/users/:id/preferences', userController.removeUserPreference);

// Authentication services
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

export default router;