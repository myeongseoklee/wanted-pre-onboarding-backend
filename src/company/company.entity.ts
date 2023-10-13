import { RecruitmentNotice } from './../recruitment-notice/entity/recruitment-notice.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/entity.base';

export interface CreateCompanyProps {
  name: string;
  email: string;
  password: string;
}

@Index(['id'])
@Entity('company', { schema: 'wanted' })
export class Company extends BaseEntity {
  @Column('varchar', {
    name: 'name',
    nullable: false,
    length: 30,
  })
  name: string;

  @Column('varchar', { name: 'email', nullable: false, length: 60 })
  email: string;

  @Column('varchar', { name: 'password', nullable: false, length: 30 })
  password: string;

  @OneToMany(
    () => RecruitmentNotice,
    (recruitmentNotice) => recruitmentNotice.company,
  )
  recruitmentNotices: RecruitmentNotice[];

  static create(props: CreateCompanyProps) {
    const company = new Company();
    company.name = props.name;
    company.email = props.email;
    company.password = props.password;
    return company;
  }
}
