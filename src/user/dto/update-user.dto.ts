export class UpdateUserDto {
  firstName?: string; // Optional fields for partial updates
  lastName?: string;
  email?: string;
  password?: string;
}
