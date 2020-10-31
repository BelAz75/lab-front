import { USER_AUTHORITIES } from '../constants/authorities.constant';

export class LabUserModel {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  authorities: USER_AUTHORITIES[]

  constructor (data: Partial<LabUserModel> = {}) {
    Object.assign(this, data);
  }
}
