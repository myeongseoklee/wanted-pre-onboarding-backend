import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import {
  EXPERIENCE_YEARS,
  ExperienceType,
  CreateRecruitmentNoticeProps,
  WorkingArea,
} from '../type/recruitment-notice.type';
import {
  RECRUITMENT_NOTICE_STATUS,
  RecruitmentNoticeStatusType,
} from '../type/recruitment-notice.type';
import { RecruitmentNotice } from '../entity/recruitment-notice.entity';
import { ArrayContainsConstants } from '../type/array-contains-constants.validator';

class WorkingAreaDto {
  @IsNotEmpty()
  @IsLongitude()
  longitude: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  getProps() {
    const workingAreaObj: WorkingArea = {
      longitude: this.longitude,
      latitude: this.latitude,
    };

    return Object.freeze(workingAreaObj);
  }
}

export class CreateRecruitmentNoticeDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  title: string;

  /**
   * 지원자의 경력 조건을 string 배열로 받습니다. 신입의 경우 배열에는 'INEXPERIENCED'만 포함됩니다. 만약 3년차 이하를 채용하려는 경우 배열에는 'INEXPERIENCED', 'ONE', 'TWO', 'THREE'가 포함되어야 합니다.
   */
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(ArrayContainsConstants, [...EXPERIENCE_YEARS])
  experienceYears: ExperienceType[];

  /**
   * 근무지 정보는 위도와 경도 값을 갖는 객체로 받습니다.
   */
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => WorkingAreaDto)
  workingArea: WorkingAreaDto;

  @Expose()
  @IsNotEmpty()
  @IsString()
  introduction: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  qualifications: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  benefits: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  tasks: string;

  /**
   * 채용 시작일은 채용 공고 등록 신청시간(현재) 보다 이전일 수 없습니다.
   */
  @Expose()
  @IsNotEmpty()
  @IsDate()
  @MinDate(() => new Date())
  @Transform((startDate) => new Date(startDate.value))
  startDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Transform((endDate) => new Date(endDate.value))
  endDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsIn(RECRUITMENT_NOTICE_STATUS)
  status: RecruitmentNoticeStatusType;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  /**
   * 채용 보상금은 최소 50만원 이상입니다.
   */
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(500000)
  recruitmentCompensation?: number;

  @Expose()
  @IsOptional()
  @IsString()
  preferenceQualifications?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  technologyStacks?: string[];

  constructor() {}

  toEntity(): RecruitmentNotice {
    const data: CreateRecruitmentNoticeProps = {
      title: this.title,
      experienceYears: this.experienceYears,
      workingArea: this.workingArea.getProps(),
      introduction: this.introduction,
      qualifications: this.qualifications,
      benefits: this.benefits,
      tasks: this.tasks,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      recruitmentCompensation: this.recruitmentCompensation,
      preferenceQualifications: this.preferenceQualifications,
      technologyStacks: this.technologyStacks,
      jobId: this.jobId,
      companyId: this.companyId,
    };

    return RecruitmentNotice.create(Object.freeze(data));
  }
}
