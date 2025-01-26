import { User } from "./user.entity";

export interface UserResponse{
    statusCode: number,
    message: string,
    data: Partial<User>
}