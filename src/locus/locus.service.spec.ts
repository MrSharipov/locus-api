import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocusEntity } from './entities/locus.entity';
import { LocusService } from './locus.service';
import { getUserByRole, UserRoleEnum } from '../users';

describe('LocusService', () => {
  let service: LocusService;

  let repository: Repository<LocusEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocusService,
        {
          provide: getRepositoryToken(LocusEntity),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              distinct: jest.fn().mockReturnThis(),
              leftJoin: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([]),
            })),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<LocusService>(LocusService);
    repository = moduleRef.get<Repository<LocusEntity>>(
      getRepositoryToken(LocusEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw forbidden exception when normal user uses sideloading', async () => {
    const normalUser = getUserByRole(UserRoleEnum.NORMAL);
    await expect(
      service.getLocus(
        {
          sideloading: 'locusMembers',
        } as any,
        {
          userId: normalUser.id,
          username: normalUser.username,
          role: normalUser.role,
        },
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow admin sideloading', async () => {
    const adminUser = getUserByRole(UserRoleEnum.ADMIN);
    const result = await service.getLocus(
      {
        sideloading: 'locusMembers',
      } as any,
      {
        userId: adminUser.id,
        username: adminUser.username,
        role: adminUser.role,
      },
    );

    expect(result).toEqual([]);
  });
});
