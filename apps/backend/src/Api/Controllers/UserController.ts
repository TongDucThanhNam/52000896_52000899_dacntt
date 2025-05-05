import type { IUserServices } from "../../Application/Persistences/IServices/IUserServices.ts";
import UserServices from "../../Application/Features/User/UserServices";
import type { Context } from "hono";

export default class UserController {
  private userServices: IUserServices = new UserServices();

  //CRUD
  getAllUsers = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy tất cả người dùng'
              #swagger.description = 'Endpoint để lấy tất cả người dùng'
            */
      const query = c.req.queries();
      console.log(query);
      const result = await this.userServices.getAllUsers(query);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message });
    }
  };

  getUserById = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy thông tin người dùng'
              #swagger.description = 'Endpoint để lấy thông tin người dùng theo Id'
            */
      const userId = c.req.param("userId");
      const result = await this.userServices.getUserById(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  createUser = async (c: Context): Promise<any> => {
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
      const body = await c.req.json();
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
      } = body;

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

      if (result.statusCode !== undefined)
        return c.json({ message: result.message }, result.statusCode);

      return c.json(result, 201);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  updateUser = async (c: Context): Promise<any> => {
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
      const userId = c.req.param("userId");
      const body = await c.req.json();
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
      } = body;

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
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  deleteUser = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Xóa người dùng'
              #swagger.description = 'Endpoint để xóa người dùng theo Id'
            */
      const userId = c.req.param("userId");
      const result = await this.userServices.deleteUser(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  updateUserPreferences = async (c: Context): Promise<any> => {
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
      const body = await c.req.json();
      const { userId, userPreferences } = body;

      const data = {
        userId,
        userPreferences,
      };
      const result = await this.userServices.updateUserPreferences(data);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  getUserPreferences = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy tất cả sở thích người dùng'
              #swagger.description = 'Endpoint để lấy sở thích của người dùng theo Id'
            */
      const userId = c.req.param("userId");
      const result = await this.userServices.getUserPreferences(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  addUserPreference = async (c: Context): Promise<any> => {
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
      const body = await c.req.json();
      const { userId, preferenceType, preferenceValue, preferenceScore } = body;

      const data = {
        userId,
        preferenceType,
        preferenceValue,
        preferenceScore,
      };
      const result = await this.userServices.addUserPreference(data);
      return c.json(result, 201);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  removeUserPreference = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Xóa sở thích người dùng'
              #swagger.description = 'Endpoint để xóa sở thích người dùng theo Id'
            */
      const userId = c.req.param("userId");
      const result = await this.userServices.removeUserPreference(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  registerUser = async (c: Context): Promise<any> => {
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

      const body = await c.req.json();
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
      } = body;

      console.log("req.body", body);

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
      const result: any = await this.userServices.registerUser(data);

      if (result.statusCode !== undefined)
        return c.json({ message: result.message }, result.statusCode);

      return c.json(result, 201);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  loginUser = async (c: Context): Promise<any> => {
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
      const body = await c.req.json();
      const { userEmail, userPasswordHash } = body;

      const data = {
        userEmail,
        userPasswordHash,
      };
      const result = await this.userServices.loginUser(data);
      if (result.statusCode !== undefined)
        return c.json({ message: result.message }, result.statusCode);

      // console.log(result);
      // save result to cookie
      // c.cookie("accessToken", result.data?.accessToken, {
      //     // httpOnly: true, //Cookie is not accessible via client-side script
      //     // signed: true, // Indicates if the cookie should be signed
      //     maxAge: 1000 * 60 * 60 * 8, // 8 hours
      // });
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  logoutUser = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đăng xuất người dùng'
              #swagger.description = 'Endpoint để đăng xuất người dùng theo Id'
            */
      const userId = c.req.param("userId");
      const result = await this.userServices.logoutUser(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  forgotPassword = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Quên mật khẩu'
              #swagger.description = 'Endpoint để quên mật khẩu theo email'
            */
      const body = await c.req.json();
      const userEmail = body.userEmail;
      const result = await this.userServices.forgotPassword(userEmail);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };

  resetPassword = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Đặt lại mật khẩu'
              #swagger.description = 'Endpoint để đặt lại mật khẩu theo email'
            */
      const body = await c.req.json();
      const { userEmail, userPasswordHash } = body;

      const data = {
        userEmail,
        userPasswordHash,
      };
      const result = await this.userServices.resetPassword(data);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
  getCurrentUser = async (c: Context): Promise<any> => {
    try {
      /*
              #swagger.tags = ['Users']
              #swagger.summary = 'Lấy thông tin người dùng hiện tại'
              #swagger.description = 'Endpoint để lấy thông tin người dùng hiện tại'
              #swagger.security = [{ "bearerAuth": [] }]
            */
      // get header token
      // Get userId from context (set by AuthenticationMiddleWare)
      const userId = c.get("userId");
      if (!userId) {
        return c.json({ message: "Unauthorized: User not authenticated" }, 401);
      }

      const result = await this.userServices.getUserById(userId);
      return c.json(result);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  };
}
