import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { LocusEntity } from './locus.entity';

@Entity({
  schema: 'rnacen',
  name: 'rnc_locus_members',
})
export class LocusMemberEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    name: 'urs_taxid',
  })
  ursTaxid!: string;

  @Column({
    name: 'region_id',
  })
  regionId!: number;

  @Column({
    name: 'membership_status',
  })
  membershipStatus!: string;

  @ManyToOne(
    () => LocusEntity,
    locus => locus.locusMembers,
  )
  @JoinColumn({
    name: 'locus_id',
  })
  locus!: LocusEntity;
}