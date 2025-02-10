export interface response<ResponseType = Array<any> | object | undefined> {
    statusCode: number,
    response?: ResponseType,
    message: string;
}

export interface AuthUserInterface {
    userId: number;
    email: string;
  }