import { Repository } from 'typeorm';

export abstract class MysqlRepositoryBase<Entity> {
  protected constructor(private readonly repository: Repository<Entity>) {}

  getRepository() {
    return this.repository;
  }
}
