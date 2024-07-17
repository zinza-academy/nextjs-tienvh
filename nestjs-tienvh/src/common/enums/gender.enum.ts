export enum Gender {
  MALE,
  FEMALE ,
  OTHER 
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
