import { PageMetaDto } from './page-meta.dto';
import { Exclude, Expose } from 'class-transformer';
export interface RecruitmentNoticeListType {
  id: number;
  title: string;
  companyName: string;
  provinceName: string;
  cityName: string;
  recruitmentCompensate: number;
  createdAt: Date;
}
export class RecruitmentNoticeListDto<T> {
  @Exclude() private readonly _data: T[];

  @Exclude() private readonly _meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this._data = data;
    this._meta = meta;
  }

  @Expose()
  get data() {
    return this._data;
  }

  @Expose()
  get meta() {
    return this._meta;
  }
}
