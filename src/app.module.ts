import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { RecruitmentNoticeModule } from './recruitment-notice/recruitment-notice.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CompanyModule, , RecruitmentNoticeModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
