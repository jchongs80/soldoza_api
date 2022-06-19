import { PlantZoneDetail } from 'src/plant-zone-detail/entities';
import { SubZone } from 'src/sub-zone/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soldoza_mst_zonas')
export class Zone {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_zona', type: 'varchar' })
  codZona: string;

  @Column({ name: 'descripcion_zona', type: 'varchar' })
  descripcionZona: string;

  @OneToMany(() => PlantZoneDetail, (plantZoneDetail) => plantZoneDetail.zona)
  plantZoneDetails: PlantZoneDetail[];

  @OneToMany(() => SubZone, (subZone) => subZone.zona)
  subZonas: SubZone[];
}
