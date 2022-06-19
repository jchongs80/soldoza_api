import { User } from 'src/user/entities';
import { Zone } from 'src/zone/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('soldoza_mst_subzonas')
export class SubZone {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_subzona', type: 'varchar' })
  codSubzona: string;

  @Column({ name: 'descripcion_subzona', type: 'varchar' })
  descripcionSubzona: string;

  @ManyToOne(() => Zone, (zone) => zone.subZonas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'zona_id' })
  zona: Zone;
}
