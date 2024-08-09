export enum ApprovalStatus {
  PendingApproval,
  Approved,
  Rejected 
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3
}
export enum Role {
  ADMIN,
  USER ,
}
export function getGenderString(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return 'male';
    case Gender.FEMALE:
      return 'female';
    case Gender.OTHER:
      return 'other';
    default:
      throw new Error('Invalid gender');
  }
}

export function getGenderEnum(genderString: string): Gender {
  switch (genderString.toLowerCase()) {
    case 'male':
      return Gender.MALE;
    case 'female':
      return Gender.FEMALE;
    case 'other':
      return Gender.OTHER;
    default:
      throw new Error('Invalid gender string');
  }
}


export function getRoleString(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return 'admin';
    case Role.USER:
      return 'user';
    default:
      throw new Error('Invalid role');
  }
}

export function getRoleEnum(roleString: string): Role {
  switch (roleString.toLowerCase()) {
    case 'admin':
      return Role.ADMIN;
    case 'user':
      return Role.USER;
    default:
      throw new Error('Invalid role string');
  }
}
