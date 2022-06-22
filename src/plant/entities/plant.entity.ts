import { Incidence } from 'src/incidence/entities';
import { PlantZoneDetail } from 'src/plant-zone-detail/entities';
import { Project } from 'src/project/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('soldoza_mst_grl_instalacion')
export class Plant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_instalacion', type: 'varchar' })
  codInstalacion: string;

  @Column({ name: 'descripcion_instalacion', type: 'varchar' })
  descripcionInstalacion: string;

  @ManyToOne(() => Project, (project) => project.instalaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Project;

  @OneToMany(
    () => PlantZoneDetail,
    (plantZoneDetail) => plantZoneDetail.instalacion,
  )
  plantZoneDetails: PlantZoneDetail[];

  @OneToMany(() => Incidence, (incident) => incident.instalacion)
  incidentes: Incidence[];
}
