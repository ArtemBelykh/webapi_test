import { IsNumber } from 'class-validator';

export interface IService {
  codeSus: string;
  nameUs: string;
}

export interface IAccount {
  personalAccount: string;
  service: IService;
  mainUnit: string;
  mainAmount: number;
}

export const topic = 'account.account-service.query';

export class Request {
  @IsNumber()
  userId: number;
}

export class Response {
  userId: number;

  address: string;

  accounts: IAccount[];
}
