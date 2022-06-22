import { Plant } from 'src/plant/entities';
import { Project } from 'src/project/entities';
import { Zone } from 'src/zone/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubZone } from '../../sub-zone/entities/sub-zone.entity';

@Entity('wo_soldoza_incidentes')
export class Incidence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Project, (project) => project.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyectoid' })
  proyecto: Project;

  @ManyToOne(() => Plant, (plant) => plant.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instalacionid' })
  instalacion: Plant;

  @ManyToOne(() => Zone, (zone) => zone.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'zonaid' })
  zona: Zone;

  @ManyToOne(() => SubZone, (subZone) => subZone.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subzonaid' })
  subZona: SubZone;
}
