import { ApprovalStatus } from "./enum";

export interface RegistrationRow {
  'id': number,
  'name': string,
  'dob': string,
  'gender':string,
  'cmt': string,
  'status': ApprovalStatus
}
