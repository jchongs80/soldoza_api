import { Plant } from 'src/plant/entities';
import { User } from 'src/user/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wo_soldoza_mst_instalacion_usuario')
export class PlantUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Plant, (plant) => plant.instalacionesUsuarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instalacion_id' })
  instalacion: Plant;

  @ManyToOne(() => User, (user) => user.instalacionesUsuarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
