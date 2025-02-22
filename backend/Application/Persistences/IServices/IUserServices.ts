import type {UserWithBase} from "../../../Domain/Entities/UserEntities.ts";
import type {PreferenceWithBase} from "../../../Domain/Entities/PreferenceEntities.ts";
import type {CoreException} from "../../Common/Exceptions/CoreException.ts";

export interface IUserServices {
    // User CRUD Operations
    createUser(data: any): Promise<typeof UserWithBase | CoreException>;

    getUserById(data: any): Promise<typeof UserWithBase | null>;

    getAllUsers(data: any): Promise<typeof UserWithBase[] | null>;

    updateUser(data: any): Promise<typeof UserWithBase | null>;

    deleteUser(data: any): Promise<typeof UserWithBase | null>;

    // User Preferences Management
    addUserPreference(data: any): Promise<typeof PreferenceWithBase | null>;

    updateUserPreferences(data: any): Promise<typeof PreferenceWithBase | null>;

    getUserPreferences(data: any): Promise<typeof PreferenceWithBase | null>;

    removeUserPreference(data: any): Promise<boolean>;

    // Authentication Services
    registerUser(data: any): Promise<typeof UserWithBase | CoreException>;

    loginUser(data: any): Promise<any>;

    logoutUser(data: any): Promise<boolean>;

    forgotPassword(data: any): Promise<void>;

    resetPassword(data: any): Promise<void>;
}