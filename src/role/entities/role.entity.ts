import { User } from 'src/user/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wo_soldoza_sec_rol')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'descripcion_rol', type: 'varchar', length: 70 })
  descripcionRol: string;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];
}
