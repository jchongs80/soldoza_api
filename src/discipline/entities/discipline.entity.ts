import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Incidence } from '../../incidence/entities/incidence.entity';
import { Category } from '../../category/entities/category.entity';
import { UserDiscipline } from 'src/user-discipline/entities';

@Entity('wo_soldoza_mst_disciplina')
export class Discipline {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_disciplina', type: 'varchar' })
  codDisciplina: string;

  @Column({ name: 'descripcion_disciplina', type: 'varchar' })
  descripcionDisciplina: string;

  @OneToMany(() => Category, (category) => category.disciplina)
  categorias: Category[];

  @OneToMany(() => Incidence, (incidence) => incidence.disciplina)
  incidences: Incidence[];

  @OneToMany(
    () => UserDiscipline,
    (userDiscipline) => userDiscipline.disciplina,
  )
  usuarioDisciplinas: UserDiscipline[];
}
