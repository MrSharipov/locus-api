import { Module } from '@nestjs/common';
import { LocusService } from './locus.service';
import { LocusController } from './locus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusEntity, LocusMemberEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([
    LocusEntity, 
    LocusMemberEntity
  ])],
  providers: [LocusService],
  controllers: [LocusController],
})
export class LocusModule {}
