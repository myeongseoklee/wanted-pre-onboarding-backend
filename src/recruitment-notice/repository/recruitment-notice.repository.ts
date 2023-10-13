import { Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { RecruitmentNotice } from '../entity/recruitment-notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecruitmentNoticeRepository extends MysqlRepositoryBase<RecruitmentNotice> {
  constructor(
    @InjectRepository(RecruitmentNotice)
    private recruitmentNoticeRepository: Repository<RecruitmentNotice>,
  ) {
    super(recruitmentNoticeRepository);
  }
}
