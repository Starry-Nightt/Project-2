import { GENDER, ROLE, STATUS } from '@constants/enum';

export class User {
  id: number;
  email: string;
  password: string;
  username: string;
  gender: GENDER;
  status: STATUS;
  role: ROLE;
}
