import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetLocusQueryDto } from './dto/get-locus-query.dto';
import { LocusEntity } from './entities/locus.entity';
import { RequestUser } from './interfaces/request-user.interface';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(LocusEntity)
    private readonly locusRepository: Repository<LocusEntity>,
  ) {}

  async getLocus(dto: GetLocusQueryDto, user: RequestUser) {
    const query = this.locusRepository
      .createQueryBuilder('locus')
      .distinct(true);

    /* Sideloading */

    if (dto.sideloading === 'locusMembers') {
      if (user.role !== 'admin') {
        throw new ForbiddenException('Sideloading allowed only for admin');
      }
      // Include locusMembers in the result
      query.leftJoinAndSelect('locus.locusMembers', 'locusMembers');
    } else {
      // Just join locusMembers for filtering, but don't select them
      query.leftJoin('locus.locusMembers', 'locusMembers');
    }

    /* FILTERS */

    if (dto.id) {
      query.andWhere('locus.id = :id', { id: dto.id });
    }

    if (dto.assemblyId) {
      query.andWhere('locus.assembly_id = :assemblyId', {
        assemblyId: dto.assemblyId,
      });
    }

    if (dto.regionId) {
      query.andWhere('locusMembers.region_id = :regionId', {
        regionId: dto.regionId,
      });
    }

    if (dto.membershipStatus) {
      query.andWhere('locusMembers.membership_status = :membershipStatus', {
        membershipStatus: dto.membershipStatus,
      });
    }

    /* SORTING */

    const sortFieldMap = {
      id: 'locus.id',
      assemblyId: 'locus.assembly_id',
      memberCount: 'locus.member_count',
    };

    if (dto.sortBy) {
      query.orderBy(sortFieldMap[dto.sortBy], dto.order || 'ASC');
    }

    /* LIMITED USER RESTRICTIONS */

    if (user.role === 'limited') {
      const allowedRegions = [86118093, 86696489, 88186467];

      query.andWhere('locusMembers.region_id IN (:...allowedRegions)', {
        allowedRegions,
      });
    }

    /* PAGINATION */

    const page = dto.page || 1;

    const limit = dto.limit || 1000;

    query.skip((page - 1) * limit);

    query.take(limit);

    /* EXECUTE QUERY */

    const results = await query.getMany();

    // If user is normal or limited, we return only a subset of fields.
    if (user.role === 'normal' || user.role === 'limited') {
      return results.map((locus) => ({
        id: locus.id,
        assemblyId: locus.assemblyId,
        locusName: locus.locusName,
        publicLocusName: locus.publicLocusName,
        chromosome: locus.chromosome,
        strand: locus.strand,
        locusStart: locus.locusStart,
        locusStop: locus.locusStop,
        memberCount: locus.memberCount,
      }));
    }

    // For admin users, we return all fields
    return results;
  }
}
