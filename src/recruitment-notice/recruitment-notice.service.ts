import { BadRequestException, Injectable } from '@nestjs/common';
import { RecruitmentNotice } from './entity/recruitment-notice.entity';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';
import { UpdateRecruitmentNoticeProps } from './type/recruitment-notice.type';
import { UpdateResult } from 'typeorm';

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

  async remove(id: number) {
    const { affected }: UpdateResult = await this.recruitmentRepository
      .getRepository()
      .softDelete({ id });

    if (affected < 1)
      throw new BadRequestException('RECRUITMENT_NOTICE_ID_NOT_EXIST');

    return;
  }
}
