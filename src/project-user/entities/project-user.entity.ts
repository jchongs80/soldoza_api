import { Project } from 'src/project/entities';
import { User } from 'src/user/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wo_soldoza_mst_proyectos_usuario')
export class ProjectUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Project, (project) => project.projectUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Project;

  @ManyToOne(() => User, (user) => user.projectUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
