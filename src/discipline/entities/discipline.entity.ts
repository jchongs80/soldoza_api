import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Incidence } from '../../incidence/entities/incidence.entity';
import { Category } from '../../category/entities/category.entity';
import { PlantUser } from 'src/plant-user/entities';

@Entity('wo_soldoza_mst_disciplina')
export class Discipline {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_disciplina', type: 'varchar' })
  codDisciplina: string;

  @Column({ name: 'descripcion_disciplina', type: 'varchar' })
  descripcionDisciplina: string;

  @OneToMany(() => Category, (category) => category.disciplina)
  categorias: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.disciplina)
  incidences: Incidence[];

  @OneToMany(() => PlantUser, (plantUser) => plantUser.instalacion)
  instalacionesUsuarios: PlantUser[];
}
