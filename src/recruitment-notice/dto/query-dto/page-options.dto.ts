import { Expose, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export const Sort = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const SORT = Object.freeze(Object.keys(Sort));

export type SortType = keyof typeof Sort;

export class PageOptionsDto {
  @Expose()
  @Type(() => String)
  @IsIn(SORT)
  readonly order: SortType;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  search?: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  take?: number;

  get skip(): number {
    return this.page <= 0 ? (this.page = 0) : (this.page - 1) * this.take;
  }

  get searchArray(): string[] {
    return this.isExistSearch() ? this.search.split(' ') : [];
  }

  checkPaginateQuery() {
    this.checkPage();
    this.checkTake();

    return this;
  }

  private checkTake() {
    this.take = this.take && this.take >= 1 ? this.take : 20;
  }

  private checkPage() {
    this.page = this.page && this.page >= 1 ? this.page : 1;
  }

  private isExistSearch() {
    return !!this.search;
  }
}
