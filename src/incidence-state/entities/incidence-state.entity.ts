import { Incidence } from 'src/incidence/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wo_soldoza_mst_incidente_estado')
export class IncidenceState {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_estado', type: 'varchar', nullable: true })
  codEstadi: string;

  @Column({ name: 'descripcion_Etado', type: 'varchar', nullable: true })
  descripcionEstado: string;

  @OneToMany(
    () => Incidence,
    (incidence) => incidence.estado,
  )
  incidentes: Incidence[];
}
