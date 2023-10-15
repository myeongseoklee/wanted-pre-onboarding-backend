import { JobApplication } from './job-application.entity';
import { BaseEntity } from '../../base/entity.base';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';

export interface UserSignUpProps {
  name: string;
  email: string;
  password: string;
  jobId: number;
}

@Index(['id'])
@Unique(['email'])
@Entity('user', { schema: 'wanted' })
export class User extends BaseEntity {
  @Column('varchar', { name: 'name', nullable: false, length: 30 })
  name: string;

  @Column('varchar', { name: 'email', nullable: false, length: 60 })
  email: string;

  @Column('varchar', { name: 'password', nullable: false, length: 30 })
  password: string;

  @OneToMany(
    () => JobApplication,
    (jobApplication) => jobApplication.recruitmentNotice,
  )
  jobApplications: JobApplication[];

  static signUp(props: UserSignUpProps) {
    const user = new User();
    user.name = props.name;
    user.email = props.email;
    user.password = props.password;

    return user;
  }
}
