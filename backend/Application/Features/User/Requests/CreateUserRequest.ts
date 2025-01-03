export class CreateUserRequest {
    userName: string;
    userPasswordHash: string;
    userEmail: string;
    userPhone: string;
    //attributes related to user
    userHeight: number;
    userWeight: number;
    userDateOfBirth: Date;
    userAddress: number;
    userImageUrl: number;
    userGender: number;
    userJob: number;
    userCity: number;
    userRole: number;


    constructor(userName: string, userPasswordHash: string, userEmail: string, userPhone: string, userHeight: number, userWeight: number, userDateOfBirth: Date, userAddress: number, userImageUrl: number, userGender: number, userJob: number, userCity: number, userRole: number) {
        this.userName = userName;
        this.userPasswordHash = userPasswordHash;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userHeight = userHeight;
        this.userWeight = userWeight;
        this.userDateOfBirth = userDateOfBirth;
        this.userAddress = userAddress;
        this.userImageUrl = userImageUrl;
        this.userGender = userGender;
        this.userJob = userJob;
        this.userCity = userCity;
        this.userRole = userRole;
    }
}