import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResponse } from './user.response';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('register')
    async register(@Body() user: Partial<User>): Promise<UserResponse>{
        return this.userService.register(user);
    }

}
