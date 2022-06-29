import { ProjectUser } from 'src/project-user/entities';
import { User } from 'src/user/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wo_soldoza_sec_tipo_usuario')
export class UserType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'descripcion_tipo', type: 'varchar', length: 70 })
  descripcionTipo: string;

  @OneToMany(() => User, (user) => user.tipoUsuario)
  usuarios: User[];
}
