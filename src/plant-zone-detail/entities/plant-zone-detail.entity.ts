import { Plant } from 'src/plant/entities';
import { Zone } from 'src/zone/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soldoza_mst_grl_detalle_inst_zona')
export class PlantZoneDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Plant, (plant) => plant.plantZoneDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instalacion_id' })
  instalacion: Plant;

  @ManyToOne(() => Zone, (zone) => zone.plantZoneDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'zona_id' })
  zona: Zone;
}
