import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentNoticeDto } from './create-recruitment-notice.dto';
import { UpdateRecruitmentNoticeProps } from '../domain/type/recruitment-notice.type';

export class UpdateRecruitmentNoticeDto extends PartialType(
  OmitType(CreateRecruitmentNoticeDto, ['jobId', 'companyId']),
) {
  getProps() {
    const props: UpdateRecruitmentNoticeProps = {};

    for (const key of Object.keys(this)) {
      props[key] = this[key];
    }

    return Object.freeze(props);
  }
}
