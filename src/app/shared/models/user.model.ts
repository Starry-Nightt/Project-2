import { GENDER, ROLE, STATUS } from '@constants/enum';

export class User {
  id: number;
  email: string;
  status: STATUS;
  accountId: number;
  firstName: string;
  lastName: string;
  gender: GENDER;
  role: ROLE;
  birthday?: string;
  fullName?: string;
}
