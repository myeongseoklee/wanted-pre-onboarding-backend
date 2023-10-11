import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentNoticeDto } from './create-recruitment-notice.dto';

export class UpdateRecruitmentNoticeDto extends PartialType(CreateRecruitmentNoticeDto) {}
