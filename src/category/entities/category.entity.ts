import { IncidenceCategory } from 'src/incidence-category/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discipline } from '../../discipline/entities/discipline.entity';

@Entity('wo_soldoza_mst_disciplina_categoria')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cod_categoria', type: 'varchar' })
  codCategoria: string;

  @Column({ name: 'descripcion_categoria', type: 'varchar' })
  descripcionCategoria: string;

  @ManyToOne(() => Discipline, (discipline) => discipline.categorias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'disciplina_id' })
  disciplina: Category;

  @OneToMany(
    () => IncidenceCategory,
    (incidenceCategory) => incidenceCategory.categoria,
  )
  incidenteCategorias: IncidenceCategory[];
}
