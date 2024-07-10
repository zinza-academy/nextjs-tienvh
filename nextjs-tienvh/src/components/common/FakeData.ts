import { ApprovalStatus } from "./enum";

export interface RegistrationRow {
  'id': number,
  'name': string,
  'dob': string,
  'gender':string,
  'cmt': string,
  'status': ApprovalStatus
}

export interface UserInfo {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: number;
  province: number;
  district: number;
  ward: number;
}
