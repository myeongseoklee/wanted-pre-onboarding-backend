import { PageResponseType } from './../dto/query-dto/page.response-dto';
import { Company } from './../../company/company.entity';
import { Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { RecruitmentNotice } from '../entity/recruitment-notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { SortType } from '../dto/query-dto/page-options.dto';
import { City } from '../entity/city.entity';
import { isString } from 'class-validator';
import { Province } from '../entity/province.entity';

const ALIAS = {
  RECRUITMENT_NOTICE: 'rn',
  COMPANY: 'co',
  CITY: 'ci',
  PROVINCE: 'pr',
} as const;

const COLUMN = {
  TITLE: 'title',
  NAME: 'name',
} as const;

@Injectable()
export class RecruitmentNoticeRepository extends MysqlRepositoryBase<RecruitmentNotice> {
  constructor(
    @InjectRepository(RecruitmentNotice)
    private readonly recruitmentNoticeRepository: Repository<RecruitmentNotice>,
  ) {
    super(recruitmentNoticeRepository);
  }

  async getPaginatedList(
    take?: number,
    skip?: number,
    order?: SortType,
    searches?: string[],
  ) {
    const queryBuilder = this.getRepository().createQueryBuilder(
      ALIAS.RECRUITMENT_NOTICE,
    );

    let paginatedQuery = queryBuilder
      .select([
        `${ALIAS.RECRUITMENT_NOTICE}.id as id`,
        `${ALIAS.RECRUITMENT_NOTICE}.title as title`,
        `${ALIAS.COMPANY}.name as companyName`,
        `${ALIAS.PROVINCE}.name as provinceName`,
        `${ALIAS.CITY}.name as cityName`,
        `${ALIAS.RECRUITMENT_NOTICE}.recruitmentCompensation as recruitmentCompensation`,
        `${ALIAS.RECRUITMENT_NOTICE}.created_at as createdAt`,
      ])
      .leftJoin(
        City,
        `${ALIAS.CITY}`,
        `${ALIAS.CITY}.id = ${ALIAS.RECRUITMENT_NOTICE}.city_id`,
      )
      .leftJoin(
        Province,
        `${ALIAS.PROVINCE}`,
        `${ALIAS.PROVINCE}.id = ${ALIAS.CITY}.province_id`,
      )
      .leftJoin(
        Company,
        `${ALIAS.COMPANY}`,
        `${ALIAS.COMPANY}.id = ${ALIAS.RECRUITMENT_NOTICE}.company_id`,
      )
      .where(`1 = 1`)
      .limit(take)
      .offset(skip)
      .orderBy({ createdAt: order });

    if (!!searches && searches.length > 0) {
      paginatedQuery = this.addSearchQuery(paginatedQuery, searches);
    }

    return {
      total: await paginatedQuery.getCount(),
      data: (await paginatedQuery.getRawAndEntities<PageResponseType>()).raw,
    };
  }

  private addSearchQuery(
    paginatedQuery: SelectQueryBuilder<RecruitmentNotice>,
    searches: string[],
  ) {
    paginatedQuery.andWhere(
      this.whereFactory(searches, ALIAS.RECRUITMENT_NOTICE, COLUMN.TITLE),
    );

    paginatedQuery.orWhere(
      this.whereFactory(searches, ALIAS.COMPANY, COLUMN.NAME),
    );

    return paginatedQuery;
  }

  private whereFactory(searches: string[], alias: string, column: string) {
    return new Brackets((qb) => {
      searches.forEach((search: string) => {
        isString(search) && qb.orWhere(`${alias}.${column} like "%${search}%"`);
      });
    });
  }
}
