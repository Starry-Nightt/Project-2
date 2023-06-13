import { GENDER, ROLE, STATUS } from '@constants/enum';

export interface LoginDetail {
  email: string;
  password: string;
}

export interface RegisterDetail {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  role: ROLE;
  birthday?: string;
}
