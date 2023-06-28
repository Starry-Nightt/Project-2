import { GENDER, ROLE, STATUS } from '@constants/enum';

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  role: ROLE;
  birthday: string;
}

export interface UpdateUserPayload {
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: GENDER;
  birthday?: string;
  status?: STATUS;
}
