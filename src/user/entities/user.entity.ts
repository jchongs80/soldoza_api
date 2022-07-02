import { Length } from 'class-validator';
import { ProjectUser } from 'src/project-user/entities';
import { Role } from 'src/role/entities';
import { UserType } from 'src/user-type/entities';
import { Incidence } from '../../incidence/entities/incidence.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from 'src/photo/entities';

@Entity('wo_soldoza_sec_usuarios')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nombre_usuario', type: 'varchar', length: 70 })
  nombreUsuario: string;

  @Column({ name: 'apellidos_usuario', type: 'varchar', length: 70 })
  apellidosUsuario: string;

  @Column({ name: 'email_usuario', type: 'varchar', length: 70 })
  emailUsuario: string;

  @Column({ name: 'password_usuario', type: 'varchar' })
  @Length(5, 20)
  passwordUsuario: string;

  @Column({ name: 'foto_usuario', type: 'varchar', nullable: true })
  fotoUsuario: string;

  @Column({ name: 'firma_usuario', type: 'varchar', nullable: true })
  firmaUsuario: string;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rolid' })
  rol: Role;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.usuario)
  projectUsers: ProjectUser[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioCreador)
  incidentesCreados: Incidence[];

  @OneToMany(() => Photo, (photo) => photo.usuario)
  incidenteFotos: Photo[];

  @ManyToOne(() => UserType, (userType) => userType.usuarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tipo_usuario_id' })
  tipoUsuario: UserType;
}
