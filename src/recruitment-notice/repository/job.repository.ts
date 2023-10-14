import { Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { Job } from '../entity/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobRepository extends MysqlRepositoryBase<Job> {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super(jobRepository);
  }

  async findOneById(id: number) {
    return await this.getRepository().findOne({
      where: { id },
      relations: { jobGroup: true },
    });
  }
}
