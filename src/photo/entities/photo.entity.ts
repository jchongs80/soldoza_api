import { User } from 'src/user/entities';
import { Incidence } from 'src/incidence/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wo_soldoza_mst_foto')
export class Photo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'foto_url', type: 'varchar', nullable: true })
  fotoUrl: string;

  @Column({ name: 'latitud', type: 'varchar', nullable: true })
  latitud: string;

  @Column({ name: 'longitud', type: 'varchar', nullable: true })
  longitud: string;

  @ManyToOne(() => Incidence, (incidence) => incidence.fotos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'incidente_id' })
  incidente: Incidence;

  @ManyToOne(() => User, (user) => user.incidenteFotos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
