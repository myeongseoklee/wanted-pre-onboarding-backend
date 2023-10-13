import { Company } from './../../company/company.entity';
import { BaseEntity } from '../../base/entity.base';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { JsonTransformer } from '../type/json.transformer';
import {
  ExperienceYears,
  ExperienceYearsCodeType,
  ExperienceType,
  CreateRecruitmentNoticeProps,
  WorkingArea,
} from '../type/recruitment-notice.type';
import { Job } from './job.entity';
import { RecruitmentNoticeStatusType } from '../type/recruitment-notice.type';

@Index(['id'])
@Entity('recruitment_notice', { schema: 'wanted' })
export class RecruitmentNotice extends BaseEntity {
  @Column('varchar', {
    name: 'title',
    nullable: false,
    length: 30,
  })
  title: string;

  @Column('varchar', {
    name: 'experience_years',
    nullable: false,
    transformer: new JsonTransformer<ExperienceYearsCodeType>(),
    length: 255,
  })
  experienceYears: ExperienceType[];

  @Column('varchar', {
    name: 'working_area',
    transformer: new JsonTransformer<WorkingArea>(),
    nullable: false,
  })
  workingArea: WorkingArea;

  @Column('text', {
    name: 'introduction',
    nullable: false,
  })
  introduction: string;

  @Column('text', {
    name: 'qualifications',
    nullable: false,
  })
  qualifications: string;

  @Column('text', {
    name: 'benefits',
    nullable: false,
  })
  benefits: string;

  @Column('text', {
    name: 'tasks',
    nullable: false,
  })
  tasks: string;

  @Column('timestamp', {
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @Column('timestamp', {
    name: 'end_date',
    nullable: false,
  })
  endDate: Date;

  @Column('varchar', { name: 'status', nullable: false, length: 30 })
  status: RecruitmentNoticeStatusType;

  @Column('int', {
    name: 'recruitment_compensation',
    unsigned: true,
    nullable: true,
  })
  recruitmentCompensation?: number;

  @Column('text', {
    name: 'preference_qualifications',
    nullable: true,
  })
  preferenceQualifications?: string;

  @Column('varchar', {
    name: 'technology_stacks',
    nullable: true,
    transformer: new JsonTransformer<string>(),
    length: 255,
  })
  technologyStacks?: string[];

  @ManyToOne(() => Job, (job) => job.recruitmentNotices)
  @JoinColumn([
    {
      name: 'job_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recruitment_notice_job_id',
    },
  ])
  job: Job;

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn([
    {
      name: 'company_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recruitment_notice_company_id',
    },
  ])
  company: Company;

  @BeforeInsert()
  @BeforeUpdate()
  transformExperienceYearTypeToCode() {
    const experienceYearsCodes: ExperienceYearsCodeType[] = [];

    for (const type of this.experienceYears) {
      experienceYearsCodes.push(ExperienceYears[type]);
    }

    return experienceYearsCodes.sort((a, b) => a - b);
  }

  static create(props: CreateRecruitmentNoticeProps): RecruitmentNotice {
    const recruitmentNotice = new RecruitmentNotice();
    recruitmentNotice.title = props.title;
    recruitmentNotice.experienceYears = props.experienceYears;
    recruitmentNotice.workingArea = props.workingArea;
    recruitmentNotice.introduction = props.introduction;
    recruitmentNotice.qualifications = props.qualifications;
    recruitmentNotice.benefits = props.benefits;
    recruitmentNotice.tasks = props.tasks;
    recruitmentNotice.startDate = props.startDate;
    recruitmentNotice.endDate = props.endDate;
    recruitmentNotice.status = props.status;
    recruitmentNotice.recruitmentCompensation = props.recruitmentCompensation;
    recruitmentNotice.preferenceQualifications = props.preferenceQualifications;
    recruitmentNotice.technologyStacks = props.technologyStacks;

    const job = new Job();
    job.id = props.jobId;

    recruitmentNotice.job = job;

    const company = new Company();
    company.id = props.companyId;

    recruitmentNotice.company = company;

    return recruitmentNotice;
  }
}
