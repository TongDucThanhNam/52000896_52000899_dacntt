export interface IUserServices {
    // User CRUD Operations
    createUser(data: any): Promise<any>;

    getUserById(data: any): Promise<any>;

    getAllUsers(data: any): Promise<any>;

    updateUser(data: any): Promise<any>;

    deleteUser(data: any): Promise<any>;

    // User Preferences Management
    addUserPreference(data: any): Promise<any>;

    updateUserPreferences(data: any): Promise<any>;

    getUserPreferences(data: any): Promise<any>;

    removeUserPreference(data: any): Promise<any>;

    // Authentication Services
    registerUser(data: any): Promise<any>;

    loginUser(data: any): Promise<any>;

    logoutUser(data: any): Promise<any>;

    forgotPassword(data: any): Promise<any>;

    resetPassword(data: any): Promise<any>;
}