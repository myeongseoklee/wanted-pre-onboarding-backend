import { BaseEntity } from '../../../base/entity.base';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { RecruitmentNotice } from './recruitment-notice.entity';
import { Province } from './province.entity';

@Index(['id'])
@Unique(['province', 'name'])
@Entity('city', { schema: 'wanted' })
export class City extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', nullable: false, length: 10 })
  name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  @JoinColumn([
    {
      name: 'province_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_city_province_id',
    },
  ])
  province: Province;

  @OneToMany(
    () => RecruitmentNotice,
    (recruitmentNotice) => recruitmentNotice.city,
  )
  recruitmentNotices: RecruitmentNotice[];
}
