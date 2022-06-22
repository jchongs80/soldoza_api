import { Project } from 'src/project/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('soldoza_mst_grl_clientes')
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_cliente', type: 'varchar' })
  codCliente: string;

  @Column({ name: 'nrodoc_cliente', type: 'varchar' })
  nrdDocCliente: string;

  @Column({ name: 'direccion_cliente', type: 'varchar' })
  direccionCliente: string;

  @Column({ name: 'pais', type: 'varchar' })
  pais: string;

  @Column({ name: 'ciudad', type: 'varchar' })
  ciudad: string;

  @Column({ name: 'telefono', type: 'varchar' })
  telefono: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'estado', type: 'varchar' })
  estado: string;

  @OneToMany(() => Project, (project) => project.cliente)
  proyectos: Project[];
}
