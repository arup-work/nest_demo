import { User } from "../entities/user.entity";

export interface UserResponse <response = object | object[]>{
    statusCode: number,
    message: string,
    data: response
}