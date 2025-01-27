import {z} from 'zod';

export const userSchema = z.object({
    firstName: z.string().min(4, 'First name must be at least 4 character long').nonempty('First name is required'),
    lastName: z.string().min(4, 'Last name must be at least 4 character long').nonempty('Last name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
})

export type UserInput = z.infer<typeof userSchema>;