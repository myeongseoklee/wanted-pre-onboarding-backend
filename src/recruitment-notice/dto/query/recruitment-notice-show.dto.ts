import { Exclude, Expose } from 'class-transformer';
import {
  RecruitmentNoticeListDto,
  RecruitmentNoticeListType,
} from './recruitment-notice-list.dto';
import { RecruitmentNoticeDto } from './recruitment-notice.dto';

export class RecruitmentNoticeShowDto {
  @Exclude() private readonly _recruitmentNotice: RecruitmentNoticeDto;
  @Exclude()
  private readonly _recruitmentNoticeList: RecruitmentNoticeListDto<RecruitmentNoticeListType>;

  constructor(
    recruitmentNotice: RecruitmentNoticeDto,
    recruitmentNoticeList: RecruitmentNoticeListDto<RecruitmentNoticeListType>,
  ) {
    this._recruitmentNotice = recruitmentNotice;
    this._recruitmentNoticeList = recruitmentNoticeList;
  }

  @Expose() get recruitmentNotice() {
    return this._recruitmentNotice;
  }

  @Expose() get recruitmentNoticeList() {
    return this._recruitmentNoticeList;
  }
}
