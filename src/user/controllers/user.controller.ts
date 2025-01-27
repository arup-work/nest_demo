import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserResponse } from '../responses/user.response';
import { CreateUserDto } from '../dto/create-user.dto';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse>{
        return this.userService.register(createUserDto);
    }

}
