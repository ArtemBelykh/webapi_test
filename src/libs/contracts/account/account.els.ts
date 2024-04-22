import { IsNumber } from 'class-validator';

interface IOperationDetails {
  sumAccrual: number;
  sumRecalc: number;
  scopeService: number;
}

interface IOperation {
  sumZ: number;
  sumOpl: number;
  sumFinal: number;
  details: IOperationDetails;
}

interface IService {
  codeSus: string;
  nameUs: string;
}

interface IAccount {
  personalAccount: string;
  mainUnit: string;
  mainAmount: number;
  serviceAccount: IService;
  accountOperation: IOperation;
}

interface IAccountEls {
  els: string;
  address?: string;
  elsAccount: IAccount[];
}

export namespace AccountEls {
  export const topic = 'account.els.query';

  export class Request {
    @IsNumber()
    uid: number;
    @IsNumber()
    billingYear: number;
    @IsNumber()
    billingMonth: number;
  }

  export class Response {
    els: IAccountEls;
  }
}