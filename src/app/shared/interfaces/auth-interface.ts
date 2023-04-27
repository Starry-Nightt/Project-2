import { GENDER, ROLE, STATUS } from '@constants/enum';

export interface LoginDetail {
  email: string;
  password: string;
}

export interface RegisterDetail {
  email: string;
  password: string;
  username: string;
  gender: GENDER;
  status: STATUS;
  role: ROLE;
  birthday: string;
}
