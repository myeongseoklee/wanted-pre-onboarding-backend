import { Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from '../domain/job-application.entity';

@Injectable()
export class JobApplicationRepository extends MysqlRepositoryBase<JobApplication> {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
  ) {
    super(jobApplicationRepository);
  }
}
