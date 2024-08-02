export enum TimeSlot {
  MORNING,
  MID_MORNING,
  AFTERNOON,
  MID_AFTERNOON,
  EVENING,
}

export function getTimeSlotString(timeSlot: TimeSlot): string {
  switch (timeSlot) {
    case TimeSlot.MORNING:
      return '08:00-10:00';
    case TimeSlot.MID_MORNING:
      return '10:00-12:00';
    case TimeSlot.AFTERNOON:
      return '12:00-14:00';
    case TimeSlot.MID_AFTERNOON:
      return '14:00-16:00';
    case TimeSlot.EVENING:
      return '16:00-18:00';
    default:
      throw new Error('Invalid time slot');
  }
}

export function getTimeSlotEnum(timeSlotString: string): TimeSlot {
  switch (timeSlotString) {
    case '08:00-10:00':
      return TimeSlot.MORNING;
    case '10:00-12:00':
      return TimeSlot.MID_MORNING;
    case '12:00-14:00':
      return TimeSlot.AFTERNOON;
    case '14:00-16:00':
      return TimeSlot.MID_AFTERNOON;
    case '16:00-18:00':
      return TimeSlot.EVENING;
    default:
      throw new Error('Invalid time slot string');
  }
}
