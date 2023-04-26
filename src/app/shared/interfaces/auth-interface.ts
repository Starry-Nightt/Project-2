import { GENDER, ROLE, STATUS } from "@constants/enum"

interface LoginDetail {
  email: string
  password: string
}

interface RegisterDetail {
  email: string
  password: string
  username: string
  gender: GENDER,
  status: STATUS
  role: ROLE
}
