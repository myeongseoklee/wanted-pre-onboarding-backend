import { Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { JobGroup } from '../domain/entity/job-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobGroupRepository extends MysqlRepositoryBase<JobGroup> {
  constructor(
    @InjectRepository(JobGroup)
    private readonly jobGroupRepository: Repository<JobGroup>,
  ) {
    super(jobGroupRepository);
  }
}
