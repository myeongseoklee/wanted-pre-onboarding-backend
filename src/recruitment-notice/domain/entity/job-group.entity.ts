import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../../base/entity.base';
import { Job } from './job.entity';

@Index(['id'])
@Unique(['name'])
@Entity('job_group', { schema: 'wanted' })
export class JobGroup extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    length: 30,
  })
  name: string;

  @OneToMany(() => Job, (job) => job.jobGroup, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  jobs: Job[];
}
