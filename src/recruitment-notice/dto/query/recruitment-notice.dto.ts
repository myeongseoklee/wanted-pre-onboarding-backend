import { RecruitmentNotice } from './../../entity/recruitment-notice.entity';
import {
  Coordinate,
  ExperienceType,
  RecruitmentNoticeStatusType,
} from './../../type/recruitment-notice.type';
import { Exclude, Expose } from 'class-transformer';
export class RecruitmentNoticeDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt: Date;
  @Exclude() private readonly _deletedAt: Date;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _experienceYears: ExperienceType[];
  @Exclude() private readonly _coordinate: Coordinate;
  @Exclude() private readonly _workingArea: string;
  @Exclude() private readonly _introduction: string;
  @Exclude() private readonly _qualification: string;
  @Exclude() private readonly _benefits: string;
  @Exclude() private readonly _tasks: string;
  @Exclude() private readonly _startDate: Date;
  @Exclude() private readonly _endDate: Date;
  @Exclude() private readonly _status: RecruitmentNoticeStatusType;
  @Exclude() private readonly _recruitmentCompensation?: number;
  @Exclude() private readonly _preferenceQualifications?: string;
  @Exclude() private readonly _technologyStacks?: string[];
  @Exclude() private readonly _jobName: string;
  @Exclude() private readonly _companyName: string;

  constructor(recruitmentNotice: RecruitmentNotice) {
    this._id = recruitmentNotice.id;
    this._createdAt = recruitmentNotice.createdAt;
    this._updatedAt = recruitmentNotice.updatedAt;
    this._deletedAt = recruitmentNotice.deletedAt;
    this._title = recruitmentNotice.title;
    this._experienceYears = recruitmentNotice.experienceYears;
    this._coordinate = recruitmentNotice.coordinate;
    this._workingArea = `${recruitmentNotice.city.province.name}/${recruitmentNotice.city.name}`;
    this._introduction = recruitmentNotice.introduction;
    this._qualification = recruitmentNotice.qualifications;
    this._benefits = recruitmentNotice.benefits;
    this._tasks = recruitmentNotice.tasks;
    this._startDate = recruitmentNotice.startDate;
    this._endDate = recruitmentNotice.endDate;
    this._status = recruitmentNotice.status;
    this._recruitmentCompensation = recruitmentNotice.recruitmentCompensation;
    this._preferenceQualifications = recruitmentNotice.preferenceQualifications;
    this._technologyStacks = recruitmentNotice.technologyStacks;
    this._jobName = recruitmentNotice.job.name;
    this._companyName = recruitmentNotice.company.name;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get createdAt() {
    return this._createdAt;
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt;
  }

  @Expose()
  get deletedAt() {
    return this._deletedAt;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get experienceYears() {
    return this._experienceYears;
  }

  @Expose()
  get coordinate() {
    return this._coordinate;
  }

  @Expose()
  get introduction() {
    return this._introduction;
  }

  @Expose()
  get qualifications() {
    return this._qualification;
  }

  @Expose()
  get benefits() {
    return this._benefits;
  }

  @Expose()
  get tasks() {
    return this._tasks;
  }

  @Expose()
  get startDate() {
    return this._startDate;
  }

  @Expose()
  get endDate() {
    return this._endDate;
  }

  @Expose()
  get status() {
    return this._status;
  }

  @Expose()
  get recruitmentCompensation() {
    return this._recruitmentCompensation;
  }

  @Expose()
  get preferenceQualification() {
    return this._preferenceQualifications;
  }

  @Expose()
  get technologyStacks() {
    return this._technologyStacks;
  }

  @Expose()
  get jobName() {
    return this._jobName;
  }

  @Expose()
  get companyName() {
    return this._companyName;
  }

  @Expose()
  get workingArea() {
    return this._workingArea;
  }
}
