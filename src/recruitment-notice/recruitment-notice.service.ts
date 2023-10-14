import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecruitmentNotice } from './entity/recruitment-notice.entity';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';
import { UpdateRecruitmentNoticeProps } from './type/recruitment-notice.type';
import { UpdateResult } from 'typeorm';
import { PageOptionsDto } from './dto/query-dto/page-options.dto';
import { PageMetaDto } from './dto/query-dto/page-meta.dto';
import {
  PageResponseDto,
  PageResponseType,
} from './dto/query-dto/page.response-dto';

@Injectable()
export class RecruitmentNoticeService {
  constructor(
    private recruitmentNoticeRepository: RecruitmentNoticeRepository,
  ) {}

  async create(recruitmentNotice: RecruitmentNotice) {
    return await this.recruitmentNoticeRepository
      .getRepository()
      .save(recruitmentNotice, {
        reload: false,
      });
  }

  async getPaginatedList(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order, searchArray } = pageOptionsDto;

    const { total, data } =
      await this.recruitmentNoticeRepository.getPaginatedList(
        take,
        skip,
        order,
        searchArray,
      );

    const pageMeteDto = new PageMetaDto({ pageOptionsDto, total });
    const { lastPage, page } = pageMeteDto;

    if (lastPage < page) throw new NotFoundException('PAGE_NOT_EXIST');

    return new PageResponseDto<PageResponseType>(data, pageMeteDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitmentNotice`;
  }

  async update(
    id: number,
    updateRecruitmentNoticeProps: UpdateRecruitmentNoticeProps,
  ) {
    const recruitmentNotice = await this.recruitmentNoticeRepository
      .getRepository()
      .findOne({ where: { id } });

    recruitmentNotice.update(updateRecruitmentNoticeProps);

    return await this.recruitmentNoticeRepository
      .getRepository()
      .save(recruitmentNotice);
  }

  async remove(id: number) {
    const { affected }: UpdateResult = await this.recruitmentNoticeRepository
      .getRepository()
      .softDelete({ id });

    if (affected < 1)
      throw new BadRequestException('RECRUITMENT_NOTICE_ID_NOT_EXIST');

    return;
  }
}
