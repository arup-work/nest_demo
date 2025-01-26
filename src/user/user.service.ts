import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { userSchema } from './user.schema';
import { z } from 'zod';
import { UserResponse } from './user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(user: Partial<User>): Promise<UserResponse> {
    try {
      // Validate the user data using Zod
      const validatedUser = userSchema.parse(user);

      // Check if the email already exists
      const existingUser = await this.userRepository.findOneBy({
        email: validatedUser.email,
      });
      if (existingUser) {
        throw new BadRequestException('Email is already taken');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
      validatedUser.password = hashedPassword;

      // Save to the database
      const newUser = this.userRepository.create(validatedUser);
      const savedUser = await this.userRepository.save(newUser);

      // Remove the password from the response
      const { password, id, ...userWithoutPassword } = savedUser;

      // Return a custom response structure
      return {
        statusCode: 201,
        message: 'User registered successfully',
        data: { ...userWithoutPassword, uuid: savedUser.uuid }, // Send UUID instead of original ID
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Send all validation messages in the response
        throw new BadRequestException(
          error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
        );
      }
      throw error;
    }
  }
}
