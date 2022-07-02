import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Incidence } from 'src/incidence/entities';
import { Category } from '../../category/entities/category.entity';


@Entity('wo_soldoza_mst_incidente_categoria')
export class IncidenceCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Incidence, (incidence) => incidence.incidenteCategorias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'incidente_id' })
  incidente: Incidence;

  @ManyToOne(() => Category, (category) => category.incidenteCategorias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Category;
}
