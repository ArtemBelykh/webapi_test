import {
  NotificationTypeEnum,
  NotificationVisibilityEnum,
} from '@webapi/libs/constants/runtime/exception.constant';

export interface INotificationItem {
  id: number;
  title: string;
  text: string;
  type: NotificationTypeEnum;
  date?: string;
  isRead: boolean;
  visibility: NotificationVisibilityEnum;
  link?: string;
}

export interface IConstants {
  isReadings: boolean;
  notifications: INotificationItem[];
}

export interface IUser {
  userId: number; // user->id
  firstName: string; // user->firstname
  patronymic: string; // user->patronymic
  lastName: string; // user->lastname
  email: string; // user->email
  phone: string; // user->phone
  emailConfirmed: boolean; // user->email_confirmed
  phoneConfirmed: boolean; // user->phone_confirmed
  els: {
    id: number;
    els: string;
    namingEls: {
      shortName: string;
      lastName: string;
      firstName: string;
      patronymic: string;
    };
    buildEls: {
      addressString: string;
    };
  }[];
}

export namespace UserInfo {
  export const topic = 'user.info.query';

  export class Request {
    userId: string;
  }

  export class Response {
    user: IUser;
    constants: IConstants;
  }
}
