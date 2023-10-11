import { Module } from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { RecruitmentNoticeController } from './recruitment-notice.controller';

@Module({
  controllers: [RecruitmentNoticeController],
  providers: [RecruitmentNoticeService],
})
export class RecruitmentNoticeModule {}
