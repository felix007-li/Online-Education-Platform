import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Organization } from './models/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  /**
   * Create organization
   * @param entity
   * @returns
   */
  async create(entity: DeepPartial<Organization>): Promise<boolean> {
    const res = await this.organizationRepository.save(
      this.organizationRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Organization> {
    return this.organizationRepository.findOne({
      where: {
        id,
      },
      relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'], // Add related table
    });
  }

  async updateById(
    id: string,
    entity: DeepPartial<Organization>,
  ): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);  // Merge two objects
    const res = await this.organizationRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findOrganizations({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Organization>;
  }): Promise<[Organization[], number]> {
    return this.organizationRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
      where,
      relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const res1 = await this.organizationRepository.update(id, {
      deletedBy: userId, // delete by who
    });
    if (res1) {
      const res = await this.organizationRepository.softDelete(id); 
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
