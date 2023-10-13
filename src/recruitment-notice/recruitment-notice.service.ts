import { Injectable } from '@nestjs/common';
import { RecruitmentNotice } from './entity/recruitment-notice.entity';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';
import { UpdateRecruitmentNoticeProps } from './type/recruitment-notice.type';

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

  async update(id: number, props: UpdateRecruitmentNoticeProps) {
    const recruitmentNotice = await this.recruitmentRepository
      .getRepository()
      .findOne({ where: { id } });

    recruitmentNotice.update(props);

    return await this.recruitmentRepository
      .getRepository()
      .save(recruitmentNotice);
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentNotice`;
  }
}
