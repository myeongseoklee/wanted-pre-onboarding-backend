export const RecruitmentNoticeStatus = {
  TEMPORARY_STORAGE: 'TEMPORARY_STORAGE',
  STANDBY: 'STANDBY',
  PROGRESS: 'PROGRESS',
  TERMINATION: 'TERMINATION',
} as const;

export const RECRUITMENT_NOTICE_STATUS = Object.freeze(
  Object.keys(RecruitmentNoticeStatus),
);

export type RecruitmentNoticeStatusType = keyof typeof RecruitmentNoticeStatus;

export const ExperienceYears = {
  INEXPERIENCED: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  TEN_OVER: 11,
} as const;

export const EXPERIENCE_YEARS = Object.freeze(Object.keys(ExperienceYears));

export type ExperienceType = keyof typeof ExperienceYears;

export type ExperienceYearsCodeType = (typeof ExperienceYears)[ExperienceType];

export type WorkingArea = { longitude: string; latitude: string };

export interface CreateRecruitmentNoticeProps {
  title: string;
  experienceYears: ExperienceType[];
  workingArea: WorkingArea;
  introduction: string;
  qualifications: string;
  benefits: string;
  tasks: string;
  startDate: Date;
  endDate: Date;
  status: RecruitmentNoticeStatusType;
  recruitmentCompensation?: number;
  preferenceQualifications?: string;
  technologyStacks?: string[];
  jobId: number;
  companyId: number;
}
