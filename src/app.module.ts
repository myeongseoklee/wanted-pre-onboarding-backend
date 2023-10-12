import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { RecruitmentNoticeModule } from './recruitment-notice/recruitment-notice.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './common/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CompanyModule,
    RecruitmentNoticeModule,
    UserModule,
  ],
})
export class AppModule {}
