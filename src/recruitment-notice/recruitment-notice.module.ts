import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { RecruitmentNoticeController } from './recruitment-notice.controller';
import { JobGroup } from './entity/job-group.entity';
import { Job } from './entity/job.entity';
import { RecruitmentNotice } from './entity/recruitment-notice.entity';
import { JobRepository } from './repository/job.repository';
import { JobGroupRepository } from './repository/job-group.repository';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';

const entities = [JobGroup, Job, RecruitmentNotice];
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
