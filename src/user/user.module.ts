import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { RecruitmentNoticeModule } from '../recruitment-notice/recruitment-notice.module';
import { UserRepository } from './user.repository';

const entities = [User];
const controllers = [UserController];
const services = [UserService];
const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(entities), RecruitmentNoticeModule],
  controllers: [...controllers],
  providers: [...services, ...repositories],
})
export class UserModule {}
