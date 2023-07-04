import { GENDER, ROLE, STATUS } from '@constants/enum';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  role: ROLE;
  birthday: string;
}

export interface ChangePasswordPayload {
  currentPwd: string;
  newPwd: string;
}
