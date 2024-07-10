import { ApprovalStatus } from "./enum";

export interface RegistrationRow {
  'stt': number,
  'hovaten': string,
  'ngaysinh': string,
  'gioitinh':string,
  'sochungminh': string,
  'trangthai': ApprovalStatus
}
