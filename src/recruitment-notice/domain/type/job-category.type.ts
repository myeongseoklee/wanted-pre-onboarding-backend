export const JobDevelopment = {
  SOFTWARE_ENGINEER: 'SOFTWARE_ENGINEER',
  WEB_DEVELOPER: 'WEB_DEVELOPER',
  SERVER_DEVELOPER: 'SERVER_DEVELOPER',
  FRONTEND_DEVELOPER: 'FRONTEND_DEVELOPER',
  IOS_DEVELOPER: 'IOS_DEVELOPER',
  ANDROID_DEVELOPER: 'ANDROID_DEVELOPER',
} as const;

export const JobCategory = {
  DEVELOPMENT: JobDevelopment,
} as const;

export type JobCategoryType = typeof JobCategory;
export type JobGroupType = keyof JobCategoryType;
