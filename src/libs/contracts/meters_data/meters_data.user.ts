import { IElsItem } from '@webapi/libs/contracts';

export const enum DeviceColorEnum {
  CHECK_EXPIRED = 0,
  CHECK_COMPLETES = 1,
  CHECK_CONTINUES = 2,
}

export interface IMdAmount {
  quantity: number; // operation_details -> scope_service
  unit: string; // measure -> title
}

export interface IMdDetailsItem {
  id: number; // meters_data -> id (bigint)
  startPeriodIndications: number; // meters_data -> volume_previous_period
  enteredIndication: number; // operation_details -> sum_accrual
  individualVolume: number; // Renamed from individual_volume to follow camelCase convention
  description: string; // meters_data -> additional_parameter1
  amount: IMdAmount;
}

export interface IMetersDataItem {
  counterType: string; // meters_data -> fk_make_of_meter_id (join "make_of_meter")->type
  counterNumber: string; // meters_data -> fk_sn_of_meter_id (join "sn_of_meter")->sn
  nextCheckDate: string | null; // meters_data -> date_next_check (Date)
  isDeviceColor: DeviceColorEnum;
  volMaxLength: number; // meters_data -> scoreboard_meter
  enteredCheckDate: string | null; // meters_data -> date_previous_period (Date)
  currentCheckDate: string | null; // meters_data -> date_current_period (Date)
  accommodation: string; // meters_data -> additional_parameter2
  details: IMdDetailsItem[];
}

export namespace MetersDataUser {
  export const topic = 'meters_data.user.query';

  export class Request {
    userId: string;
    startYear: number; // Renamed from start_year to follow camelCase convention
    startMonth: number; // Renamed from start_month to follow camelCase convention
    endYear: number; // Renamed from end_year to follow camelCase convention
    endMonth: number; // Renamed from end_month to follow camelCase convention
  }

  export class Response {
    els: IElsItem[];
  }
}
