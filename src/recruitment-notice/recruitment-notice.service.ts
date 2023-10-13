import { Injectable } from '@nestjs/common';
import { UpdateRecruitmentNoticeDto } from './dto/update-recruitment-notice.dto';
import { RecruitmentNotice } from './entity/recruitment-notice.entity';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';

@Injectable()
export class RecruitmentNoticeService {
  constructor(private recruitmentRepository: RecruitmentNoticeRepository) {}

  async create(recruitmentNotice: RecruitmentNotice) {
    return await this.recruitmentRepository
      .getRepository()
      .save(recruitmentNotice, {
        reload: false,
      });
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
