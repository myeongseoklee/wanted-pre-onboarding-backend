import { BaseEntity } from '../../base/entity.base';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { JobGroup } from './job-group.entity';
import { RecruitmentNotice } from './recruitment-notice.entity';
import { User } from '../../user/user.entity';

@Index(['id'])
@Unique(['name'])
@Unique(['name', 'jobGroup'])
@Entity('job', { schema: 'wanted' })
export class Job extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', nullable: false, length: 30 })
  name: string;

  @ManyToOne(() => JobGroup, (jobGroup) => jobGroup.jobs, { eager: true })
  @JoinColumn([
    {
      name: 'job_group_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_job_job_group_id',
    },
  ])
  jobGroup: JobGroup;

  @OneToMany(
    () => RecruitmentNotice,
    (recruitmentNotice) => recruitmentNotice.job,
  )
  recruitmentNotices: RecruitmentNotice[];

  @OneToMany(() => User, (user) => user.job)
  users: User[];
}
