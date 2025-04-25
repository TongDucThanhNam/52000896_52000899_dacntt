export interface IUserRepository {
    //CRUD
    createUser(userData: any): Promise<any>;

    getUserById(userId: string, queryData: any): Promise<any>;

    getAllUsers(queryData: any): Promise<any>;

    updateUserById(userId: string, userData: any): Promise<any>;

    deleteUserById(userId: string): Promise<any>;

    //Other API
}