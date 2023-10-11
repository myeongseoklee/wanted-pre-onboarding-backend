import { Injectable } from '@nestjs/common';
import { CreateRecruitmentNoticeDto } from './dto/create-recruitment-notice.dto';
import { UpdateRecruitmentNoticeDto } from './dto/update-recruitment-notice.dto';

@Injectable()
export class RecruitmentNoticeService {
  create(createRecruitmentNoticeDto: CreateRecruitmentNoticeDto) {
    return 'This action adds a new recruitmentNotice';
  }

  findAll() {
    return `This action returns all recruitmentNotice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitmentNotice`;
  }

  update(id: number, updateRecruitmentNoticeDto: UpdateRecruitmentNoticeDto) {
    return `This action updates a #${id} recruitmentNotice`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentNotice`;
  }
}
