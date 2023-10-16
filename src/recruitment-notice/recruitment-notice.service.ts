import { RecruitmentNoticeDto } from './dto/query/recruitment-notice.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecruitmentNotice } from './domain/entity/recruitment-notice.entity';
import { RecruitmentNoticeRepository } from './repository/recruitment-notice.repository';
import { UpdateRecruitmentNoticeProps } from './domain/type/recruitment-notice.type';
import { UpdateResult } from 'typeorm';
import { PaginationOptionsDto, Sort } from './dto/query/pagination-options.dto';
import { PageMetaDto } from './dto/query/page-meta.dto';
import {
  RecruitmentNoticeListType,
  RecruitmentNoticeListDto,
} from './dto/query/recruitment-notice-list.dto';
import { RecruitmentNoticeShowDto } from './dto/query/recruitment-notice-show.dto';

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

  async getPaginatedList(paginationOptionsDto: PaginationOptionsDto) {
    const { take, skip, order, searchArray } = paginationOptionsDto;

    const { total, paginatedList } =
      await this.recruitmentNoticeRepository.getPaginatedList(
        take,
        skip,
        order,
        searchArray,
      );

    const pageMeteDto = new PageMetaDto({ paginationOptionsDto, total });
    const { lastPage, page } = pageMeteDto;

    if (lastPage < page) throw new NotFoundException('PAGE_NOT_EXIST');

    return new RecruitmentNoticeListDto<RecruitmentNoticeListType>(
      paginatedList,
      pageMeteDto,
    );
  }

  async getRecruitmentNoticeById(id: number) {
    const recruitmentNotice = await this.recruitmentNoticeRepository
      .getRepository()
      .findOne({
        select: {
          job: { id: true, name: true },
          company: { id: true, name: true },
          city: { id: true, name: true, province: { id: true, name: true } },
        },
        where: { id },
        relations: { job: true, company: true, city: { province: true } },
      });

    const paginationOptionsDto = new PaginationOptionsDto(Sort.ASC, 1, 5);

    const { total, recruitmentListFromCompanyId } =
      await this.recruitmentNoticeRepository.getPaginatedListByCompanyId(
        id,
        paginationOptionsDto.take,
        paginationOptionsDto.skip,
        paginationOptionsDto.order,
      );

    return new RecruitmentNoticeShowDto(
      new RecruitmentNoticeDto(recruitmentNotice),
      new RecruitmentNoticeListDto(
        recruitmentListFromCompanyId,
        new PageMetaDto({ paginationOptionsDto, total }),
      ),
    );
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
