import { User } from './user.entity';
import { Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../base/entity.base';
import { RecruitmentNotice } from '../../recruitment-notice/domain/entity/recruitment-notice.entity';

interface JopApplicationProps {
  recruitmentNotice: RecruitmentNotice;
  user: User;
}

@Index(['id'])
@Unique(['user', 'recruitmentNotice'])
@Entity('job_application', { schema: 'wanted' })
export class JobApplication extends BaseEntity {
  @ManyToOne(
    () => RecruitmentNotice,
    (recruitment_notice) => recruitment_notice.id,
  )
  @JoinColumn([
    {
      name: 'recruitment_notice_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_job_application_recruitment_notice_id',
    },
  ])
  recruitmentNotice: RecruitmentNotice;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([
    {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_job_application_user_id',
    },
  ])
  user: User;

  static create(props: JopApplicationProps) {
    const jobApplication = new JobApplication();
    jobApplication.recruitmentNotice = props.recruitmentNotice;
    jobApplication.user = props.user;

    return jobApplication;
  }
}
