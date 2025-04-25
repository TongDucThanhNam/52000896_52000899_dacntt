import {type Context, Hono} from 'hono';
import UserController from "../Controllers/UserController";
import {AuthenticationMiddleWare} from "../Middleware/AuthenticationMiddleWare";

const userRoutes = new Hono();
const userController = new UserController();

// User routes
userRoutes.get('/users', (c: Context) => userController.getAllUsers(c));
userRoutes.post('/users', (c: Context) => userController.createUser(c));
userRoutes.get('/users/:userId', (c: Context) => userController.getUserById(c));
userRoutes.put('/users/:userId', (c: Context) => userController.updateUser(c));
userRoutes.delete('/users/:userId', (c: Context) => userController.deleteUser(c));

// User preferences
userRoutes.post('/users/:userId/preferences', (c: Context) => userController.addUserPreference(c));
// userRoutes.put('/users/:userId/preferences', (c: Context) => userController.updateUserPreferences(c));
userRoutes.get('/users/:userId/preferences', (c: Context) => userController.getUserPreferences(c));
userRoutes.delete('/users/:userId/preferences', (c: Context) => userController.removeUserPreference(c));

// Authentication services
userRoutes.post('/register', (c: Context) => userController.registerUser(c));
userRoutes.post('/login', (c: Context) => userController.loginUser(c));
userRoutes.post('/logout', (c: Context) => userController.logoutUser(c));
userRoutes.post('/forgot-password', (c: Context) => userController.forgotPassword(c));
userRoutes.post('/reset-password', (c: Context) => userController.resetPassword(c));

// Get current user
userRoutes.get('/profile',
    AuthenticationMiddleWare, // Add authentication middleware
    (c: Context) => userController.getCurrentUser(c));

export default userRoutes;
