import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './domain/user.entity';
import { RecruitmentNoticeModule } from '../recruitment-notice/recruitment-notice.module';
import { UserRepository } from './repository/user.repository';
import { JobApplication } from './domain/job-application.entity';
import { JobApplicationRepository } from './repository/job-application.repository';

const entities = [User, JobApplication];
const controllers = [UserController];
const services = [UserService];
const repositories = [UserRepository, JobApplicationRepository];

@Module({
  imports: [TypeOrmModule.forFeature(entities), RecruitmentNoticeModule],
  controllers: [...controllers],
  providers: [...services, ...repositories],
})
export class UserModule {}
