export enum RegistrationStatus {
  PENDING,
  APPROVED,
  COMPLETED
}

export function getRegistrationStatusString(status: RegistrationStatus): string {
  switch (status) {
    case RegistrationStatus.PENDING:
      return 'Đang chờ duyệt';
    case RegistrationStatus.APPROVED:
      return 'Đăng ký thành công';
    case RegistrationStatus.COMPLETED:
      return 'Đã tiêm';
    default:
      throw new Error('Invalid registration status');
  }
}

export function getRegistrationStatusEnum(statusString: string): RegistrationStatus {
  switch (statusString) {
    case 'Đang chờ duyệt':
      return RegistrationStatus.PENDING;
    case 'Đăng ký thành công':
      return RegistrationStatus.APPROVED;
    case 'Đã tiêm':
      return RegistrationStatus.COMPLETED;
    default:
      throw new Error('Invalid registration status string');
  }
}
