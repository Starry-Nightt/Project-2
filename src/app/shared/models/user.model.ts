import { GENDER, ROLE, STATUS } from '@constants/enum';

export class User {
  id: number;
  email: string;
  role: ROLE;
  status: STATUS;
  firstName: string;
  lastName: string;
  gender: GENDER;
  birthday?: string;
}
