import { IsNumber } from "class-validator";

export namespace AccountUserInfo {
  export const topic = "account.user-info.query";

  export class Request {
    @IsNumber()
    uid: number;
  }

  export class Response {
    lastName: string;
    firstName: string;
    patronymic: string;
    mainAddress: string;
    email: string;
    phone: string;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
  }
}
