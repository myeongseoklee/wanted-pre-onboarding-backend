import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../base/entity.base';
import { City } from './city.entity';

@Index(['id'])
@Unique(['name'])
@Entity('province', { schema: 'wanted' })
export class Province extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    length: 10,
  })
  name: string;

  @OneToMany(() => City, (city) => city.province, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  cities: City[];
}
