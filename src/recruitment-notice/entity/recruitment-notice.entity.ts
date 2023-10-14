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
  Coordinate,
  UpdateRecruitmentNoticeProps,
} from '../type/recruitment-notice.type';
import { Job } from './job.entity';
import { RecruitmentNoticeStatusType } from '../type/recruitment-notice.type';
import { City } from './city.entity';

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
    name: 'coordinate',
    transformer: new JsonTransformer<Coordinate>(),
    nullable: false,
    length: 100,
  })
  coordinate: Coordinate;

  @ManyToOne(() => City, (city) => city.recruitmentNotices)
  @JoinColumn([
    {
      name: 'city_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recruitment_notice_city_id',
    },
  ])
  city: City;

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

    for (const key in props) {
      recruitmentNotice[key] = props[key];
    }

    const job = new Job();
    job.id = props.jobId;

    const city = new City();
    city.id = props.cityId;

    const company = new Company();
    company.id = props.companyId;

    recruitmentNotice.job = job;
    recruitmentNotice.company = company;
    recruitmentNotice.city = city;

    return recruitmentNotice;
  }

  update(props: UpdateRecruitmentNoticeProps) {
    for (const key in props) {
      this[key] = props[key];
    }
  }
}
