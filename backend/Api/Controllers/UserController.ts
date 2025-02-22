import type {IUserServices} from "../../Application/Persistences/IServices/IUserServices.ts";
import UserServices from "../../Application/Features/User/UserServices.ts";
import type {Request, Response} from "express";
import CartServices from "../../Application/Features/Cart/CartServices.ts";

export default class UserController {
    private userServices: IUserServices = new UserServices();
    private cartServices: any = new CartServices();

    //CRUD
    getAllUsers = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy tất cả người dùng'
              #swagger.description = 'Endpoint để lấy tất cả người dùng'
            */
            const query = req.query;
            const result = await this.userServices.getAllUsers(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    getUserById = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy thông tin người dùng'
              #swagger.description = 'Endpoint để lấy thông tin người dùng theo Id'
            */
            const userId = req.params.userId;
            const result = await this.userServices.getUserById(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    createUser = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Thêm người dùng'
              #swagger.description = 'Endpoint để thêm người dùng'

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
                userRole,
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
                userRole,
            };
            const result: any = await this.userServices.createUser(data);

            // console.log(result);

            if (result.statusCode != undefined)
                return res.status(result.statusCode).json({ message: result.message });

            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Cập nhật thông tin người dùng'
              #swagger.description = 'Endpoint để cập nhật thông tin người dùng theo Id'

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
            const userId = req.params.userId;
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
                userRole,
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
                userRole,
            };
            const result = await this.userServices.updateUser(userData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Xóa người dùng'
              #swagger.description = 'Endpoint để xóa người dùng theo Id'
            */
            const userId = req.params.userId;
            const result = await this.userServices.deleteUser(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    updateUserPreferences = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Users']
                #swagger.summary = 'Cập nhật sở thích người dùng'
                #swagger.description = 'Endpoint để cập nhật sở thích người dùng theo Id'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'User preferences.',
                    required: true,
                    type: 'object',
                    schema: {
                       userId: "609c0b1f531123456789abcd",
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
    getUserPreferences = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy tất cả sở thích người dùng'
              #swagger.description = 'Endpoint để lấy sở thích của người dùng theo Id'
            */
            const userId = req.params.userId;
            const result = await this.userServices.getUserPreferences(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
    addUserPreference = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Thêm sở thích người dùng'
              #swagger.description = 'Endpoint để thêm sở thích người dùng theo Id'
              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'User preference.',
                  required: true,
                  type: 'object',
                  schema: {
                  userId: "609c0b1f531123456789abcd",
                  preferenceType: "Style",
                  preferenceValue: "Casual",
                  preferenceScore: 10
                  }
              }
            */
            const {userId, preferenceType, preferenceValue, preferenceScore} =
                req.body;

            const data = {
                userId,
                preferenceType,
                preferenceValue,
                preferenceScore,
            };
            const result = await this.userServices.addUserPreference(data);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
    removeUserPreference = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Xóa sở thích người dùng'
              #swagger.description = 'Endpoint để xóa sở thích người dùng theo Id'
            */
            const userId = req.params.userId;
            const result = await this.userServices.removeUserPreference(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
    registerUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đăng ký người dùng'
              #swagger.description = 'Endpoint để đăng ký người dùng'

              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'User information.',
                  required: true,
                  type: 'object',
                  schema: {
                      userName: "Linh Ngọc Đàm",
                      userPasswordHash: "12345678",
                      userEmail: "email@gmail.com",
                      userPhone: "0123456789",
                      userHeight: 170,
                      userWeight: 60,
                      userDateOfBirth: "01/01/2000",
                      userAddress: "Thanh xuân Hà Nội",
                      userImageUrl: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
                      userGender: "Male",
                      userJob: "Software Engineer",
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
            } = req.body;

            console.log("req.body", req.body);

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
            };
            const result:any = await this.userServices.registerUser(data);

            if (result.statusCode != undefined)
                return res.status(result.statusCode).json({ message: result.message });

            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
    loginUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đăng nhập người dùng'
              #swagger.description = 'Endpoint để đăng nhập người dùng'

              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'User information.',
                  required: true,
                  type: 'object',
                  schema: {
                    userEmail: "an.nguyen@gmail.com",
                    userPasswordHash: "newpass123"
                  }
              }
            */
            const {userEmail, userPasswordHash} = req.body;

            const data = {
                userEmail,
                userPasswordHash,
            };
            const result = await this.userServices.loginUser(data);
            // console.log(result);
            // save resule to cookie
            res.cookie("accessToken", result.data?.accessToken, {
                // httpOnly: true, //Cookie is not accessible via client-side script
                // signed: true, // Indicates if the cookie should be signed
                maxAge: 1000 * 60 * 60 * 8, // 8 hours
            });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    logoutUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đăng xuất người dùng'
              #swagger.description = 'Endpoint để đăng xuất người dùng theo Id'
            */
            const userId = req.params.userId;
            const result = await this.userServices.logoutUser(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    forgotPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Quên mật khẩu'
              #swagger.description = 'Endpoint để quên mật khẩu theo email'
            */
            const userEmail = req.body.userEmail;
            const result = await this.userServices.forgotPassword(userEmail);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    resetPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đặt lại mật khẩu'
              #swagger.description = 'Endpoint để đặt lại mật khẩu theo email'
            */
            const {userEmail, userPasswordHash} = req.body;

            const data = {
                userEmail,
                userPasswordHash,
            };
            const result = await this.userServices.resetPassword(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
    getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy thông tin người dùng hiện tại'
              #swagger.description = 'Endpoint để lấy thông tin người dùng hiện tại'
            */
            const userId = req.body.userId;
            const result = await this.userServices.getUserById(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
}