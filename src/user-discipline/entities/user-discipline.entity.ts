import { Discipline } from 'src/discipline/entities';
import { User } from 'src/user/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wo_soldoza_disciplina_usuario')
export class UserDiscipline {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Discipline, (disciplina) => disciplina.usuarioDisciplinas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'disciplina_id' })
  disciplina: Discipline;

  @ManyToOne(() => User, (user) => user.usuarioDisciplinas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
