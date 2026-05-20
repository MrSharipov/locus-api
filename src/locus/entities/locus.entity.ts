import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { LocusMemberEntity } from './locus-member.entity';


@Entity({
  schema: 'rnacen',
  name: 'rnc_locus',
})
export class LocusEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    name: 'assembly_id',
  })
  assemblyId!: string;

  @Column({
    name: 'locus_name',
  })
  locusName!: string;

  @Column({
    name: 'public_locus_name',
  })
  publicLocusName!: string;

  @Column()
  chromosome!: string;

  @Column()
  strand!: string;

  @Column({
    name: 'locus_start',
  })
  locusStart!: number;

  @Column({
    name: 'locus_stop',
  })
  locusStop!: number;

  @Column({
    name: 'member_count',
  })
  memberCount!: number;

  @OneToMany(
    () => LocusMemberEntity,
    member => member.locus,
  )
  locusMembers!: LocusMemberEntity[];
}