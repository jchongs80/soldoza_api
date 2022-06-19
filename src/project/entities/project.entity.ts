import { Plant } from 'src/plant/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soldoza_mst_grl_proyectos')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_proyecto', type: 'varchar' })
  codProyecto: string;

  @Column({ name: 'descripcion_proyecto', type: 'varchar' })
  descripcionProyecto: string;

  @Column({ name: 'usuario_actualizacion', type: 'varchar' })
  usuarioActualizacion: string;

  @Column({ name: 'fecha_creacion', type: 'varchar' })
  fechaCreacion: string;

  @Column({ name: 'fecha_actualizacion', type: 'varchar' })
  fechaActualizacion: string;

  @Column({ name: 'estado', type: 'varchar' })
  estado: string;

  @OneToMany(() => Plant, (plant) => plant.proyecto)
  instalaciones: Plant[];
}
