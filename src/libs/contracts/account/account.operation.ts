import { IsNumber } from 'class-validator';

interface ITariff {
  title: string;
  price: number;
}

interface IOperationDetails {
  sumAccrual: number;
  sumRecalc: number;
  scopeService: number;
  tariff: ITariff;
}

interface IOperation {
  sumZ: number;
  sumOpl: number;
  sumFinal: number;
  details: IOperationDetails;
}

interface ICompany {
  code: string;
  name: string;
  inn: string;
  address: string;
  offPayment: number;
}

interface IService {
  codeSus: string;
  nameUs: string;
  companyService: ICompany;
}

interface IAccount {
  personalAccount: string;
  mainUnit: string;
  mainAmount: number;
  serviceAccount: IService;
  accountOperation: IOperation;
}

interface IMonths {
  billingYear: number;
  billingMonth: number;
  elsAccount: IAccount[];
}

export namespace AccountOperations {
  export const topic = 'account.operations3months.query';

  export class Request {
    @IsNumber()
    uid: number;
    @IsNumber()
    billingYear: number;
    @IsNumber()
    billingMonth: number;
    @IsNumber()
    numberOfMonths: number; // Исправлено на camelCase и добавлен тип
  }

  export class Response {
    els: string;
    address?: string;
    months: IMonths[];
  }
}