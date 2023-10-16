import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { RecruitmentNoticeController } from './recruitment-notice.controller';
import { JobGroup } from './domain/entity/job-group.entity';
import { Job } from './domain/entity/job.entity';
import { RecruitmentNotice } from './domain/entity/recruitment-notice.entity';
import { JobRepository } from './repository/job.repository';
import { JobGroupRepository } from './repository/job-group.repository';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';
import { City } from './domain/entity/city.entity';
import { Province } from './domain/entity/province.entity';

const entities = [RecruitmentNotice, JobGroup, Job, City, Province];
const controllers = [RecruitmentNoticeController];
const services = [RecruitmentNoticeService];
const repositories = [
  JobRepository,
  JobGroupRepository,
  RecruitmentNoticeRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [...controllers],
  providers: [...services, ...repositories],
  exports: [...repositories],
})
export class RecruitmentNoticeModule {}
