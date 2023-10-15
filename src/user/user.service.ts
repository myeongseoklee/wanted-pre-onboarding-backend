import { JobApplicationRepository } from './repository/job-application.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { RecruitmentNoticeRepository } from '../recruitment-notice/repository/recruitment-notice.repository';
import { JobApplication } from './entity/job-application.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private recruitmentNoticeRepository: RecruitmentNoticeRepository,
    private jobApplicationRepository: JobApplicationRepository,
  ) {}

  async create(user: User) {
    await this.userRepository.saveIfNotExist(user);
  }

  async getUser(id: number) {
    return await this.userRepository
      .getRepository()
      .findOne({ where: { id }, relations: ['job'] });
  }

  async createJobApplication(userId: number, recruitmentNoticeId: number) {
    const user = await this.userRepository
      .getRepository()
      .findOne({ where: { id: userId } });

    const recruitmentNotice = await this.recruitmentNoticeRepository
      .getRepository()
      .findOne({ where: { id: recruitmentNoticeId } });

    try {
      await this.jobApplicationRepository
        .getRepository()
        .save(JobApplication.create({ user, recruitmentNotice }), {
          reload: false,
        });

      return;
    } catch (error) {
      throw new HttpException(
        'USER_ALREADY_APPLY_THE_JOB',
        HttpStatus.CONFLICT,
      );
    }
  }
}
