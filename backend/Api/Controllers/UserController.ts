import type {IUserServices} from "../../Application/Persistences/IServices/IUserServices.ts";
import UserServices from "../../Application/Features/User/UserServices.ts";
import type {Request, Response,} from 'express';
import CartServices from "../../Application/Features/Cart/CartServices.ts";

export default class UserController {
    private userServices: IUserServices = new UserServices();
    private cartServices: any = new CartServices();

    //CRUD
    getAllUsers = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Get all users'
                #swagger.description = 'Endpoint to get all users'
             */
            const query = req.query;
            const result = await this.userServices.getAllUsers(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    getUserById = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Get user by id'
                #swagger.description = 'Endpoint to get user by id'
             */
            const userId = req.params.id;
            const result = await this.userServices.getUserById(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    createUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Create user'
                #swagger.description = 'Endpoint to create user'

                #swagger.parameters['User'] = {
                    in: 'body',
                    description: 'User information.',
                    required: true,
                    type: 'object',
                    schema: {

                       userName: "Linh Ngọc Đàm",
                       userPasswordHash: "12345678",
                       userEmail: "linhngocdam@gmail.com",
                       userPhone: "0123456789",
                       userHeight: 170,
                       userWeight: 60,
                      userDateOfBirth: "01/01/2000",
                      userAddress: "Thanh xuân Hà Nội",
                        userImageUrl: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png",
                       userGender: "Female",
                       userJob: "KOL",
                       userCity: "Hà Nội",
                       userRole: "User"
                    }
                }
             */
            const {
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole

            } = req.body;

            const data = {
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole
            }
            const result: any = await this.userServices.createUser(data);

            console.log(result);

            if (result) {
                // Create user mean create a Cart for user
                await this.cartServices.createCart({userId: result._id});
            }
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Update user'
                #swagger.description = 'Endpoint to update user'

                #swagger.parameters['User'] = {
                    in: 'body',
                    description: 'User information.',
                    required: true,
                    type: 'object',
                    schema: {
                      userName: "Linh Ngọc Đàm 2",
                       userPasswordHash: "12345678",
                       userEmail: "linhngocdam@gmail.com",
                       userPhone: "0123456789",
                          userHeight: 170,
                          userWeight: 60,
                      userDateOfBirth: "01/01/2000",
                      userAddress: "Thanh xuân Hà Nội",
                        userImageUrl: "https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png",
                       userGender: "Female",
                       userJob: "KOL",
                       userCity: "Hà Nội",
                       userRole: "User"
                    }
                }

             */
            const userId = req.params.id;
            const {
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole
            } = req.body;

            const userData = {
                userId,
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole
            }
            const result = await this.userServices.updateUser(userData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Delete user'
                #swagger.description = 'Endpoint to delete user'
             */
            const userId = req.params.id;
            const result = await this.userServices.deleteUser(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateUserPreferences = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Update user preferences'
                #swagger.description = 'Endpoint to update user preferences'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'User preferences.',
                    required: true,
                    type: 'object',
                    schema: {
                       userId: "1",
                       userPreferences: ""
                    }
                }

             */
            const {
                userId,
                userPreferences
            } = req.body;

            const data = {
                userId,
                userPreferences
            }
            const result = await this.userServices.updateUserPreferences(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getUserPreferences = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Get user preferences'
                #swagger.description = 'Endpoint to get user preferences'
             */
            const userId = req.params.id;
            const result = await this.userServices.getUserPreferences(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    addUserPreference = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Add user preference'
                #swagger.description = 'Endpoint to add user preference'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'User preference.',
                    required: true,
                    type: 'object',
                    schema: {
                       userId: "1",
                       userPreference: ""
                    }
                }

             */
            const {
                userId,
                userPreference
            } = req.body;

            const data = {
                userId,
                userPreference
            }
            const result = await this.userServices.addUserPreference(data);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    removeUserPreference = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Remove user preference'
                #swagger.description = 'Endpoint to remove user preference'
             */
            const userId = req.params.id;
            const result = await this.userServices.removeUserPreference(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    registerUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Register user'
                #swagger.description = 'Endpoint to register user'
             */
            const {
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole
            } = req.body;

            const data = {
                userName,
                userPasswordHash,
                userEmail,
                userPhone,
                userHeight,
                userWeight,
                userDateOfBirth,
                userAddress,
                userImageUrl,
                userGender,
                userJob,
                userCity,
                userRole
            }
            const result = await this.userServices.createUser(data);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    loginUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Login user'
                #swagger.description = 'Endpoint to login user'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'User information.',
                    required: true,
                    type: 'object',
                    schema: {
                       userEmail: "tnguyen@example.net",
                          userPasswordHash: "3249531603"
                    }
                }
             */
            const {
                userEmail,
                userPasswordHash
            } = req.body;

            const data = {
                userEmail,
                userPasswordHash
            }
            const result = await this.userServices.loginUser(data);

            // save resule to cookie
            res.cookie('accessToken', result.data?.accessToken, {
                // httpOnly: true, //Cookie is not accessible via client-side script
                // signed: true, // Indicates if the cookie should be signed
                maxAge: 1000 * 60 * 60 * 8, // 8 hours
            });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    logoutUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Logout user'
                #swagger.description = 'Endpoint to logout user'
             */
            const userId = req.params.id;
            const result = await this.userServices.logoutUser(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    forgotPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Forgot password'
                #swagger.description = 'Endpoint to forgot password'
             */
            const userEmail = req.body.userEmail;
            const result = await this.userServices.forgotPassword(userEmail);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    resetPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Reset password'
                #swagger.description = 'Endpoint to reset password'
             */
            const {
                userEmail,
                userPasswordHash
            } = req.body;

            const data = {
                userEmail,
                userPasswordHash
            }
            const result = await this.userServices.resetPassword(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}