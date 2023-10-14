import { PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
}

export class PageMetaDto {
  readonly total: number;
  readonly page: number;
  readonly take: number;
  readonly lastPage: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page <= 0 ? 1 : pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.total = total;
    this.lastPage = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.lastPage;
  }
}
