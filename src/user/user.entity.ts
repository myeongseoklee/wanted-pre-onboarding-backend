import { Job } from '../recruitment-notice/entity/job.entity';
import { BaseEntity } from '../base/entity.base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export interface UserSignUpProps {
  name: string;
  email: string;
  password: string;
  jobId: number;
}

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { name: 'name', nullable: false, length: 30 })
  name: string;

  @Column('varchar', { name: 'email', nullable: false, length: 60 })
  email: string;

  @Column('varchar', { name: 'password', nullable: false, length: 30 })
  password: string;

  @ManyToOne(() => Job, (job) => job.name)
  @JoinColumn([
    {
      name: 'job_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_job_id',
    },
  ])
  job: Job;

  static signUp(props: UserSignUpProps) {
    const user = new User();
    user.name = props.name;
    user.email = props.email;
    user.password = props.password;

    const job = new Job();
    job.id = props.jobId;

    user.job = job;

    return user;
  }
}
