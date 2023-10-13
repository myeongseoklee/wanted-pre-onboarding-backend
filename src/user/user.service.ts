import { JobRepository } from './../recruitment-notice/repository/job.repository';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jobRepository: JobRepository,
  ) {}

  async create(user: User) {
    await this.userRepository.saveIfNotExist(user);
  }

  async getUser(id: number) {
    return await this.userRepository
      .getRepository()
      .findOne({ where: { id }, relations: ['job'] });
  }
}
