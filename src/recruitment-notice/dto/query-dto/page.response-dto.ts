import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
export interface PageResponseType {
  id: number;
  title: string;
  companyName: string;
  provinceName: string;
  cityName: string;
  recruitmentCompensate: number;
  createdAt: Date;
}
export class PageResponseDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
