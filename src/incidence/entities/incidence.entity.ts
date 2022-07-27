import { Plant } from 'src/plant/entities';
import { Project } from 'src/project/entities';
import { User } from 'src/user/entities';
import { Zone } from 'src/zone/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubZone } from '../../sub-zone/entities/sub-zone.entity';
import { IncidenceCategory } from '../../incidence-category/entities/incidence-category.entity';
import { Discipline } from 'src/discipline/entities';
import { IncidenceState } from 'src/incidence-state/entities';
import { Photo } from 'src/photo/entities';

@Entity('wo_soldoza_incidentes')
export class Incidence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Project, (project) => project.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proyectoid' })
  proyecto: Project;

  @ManyToOne(() => Plant, (plant) => plant.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instalacionid' })
  instalacion: Plant;

  @ManyToOne(() => Zone, (zone) => zone.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'zonaid' })
  zona: Zone;

  @ManyToOne(() => SubZone, (subZone) => subZone.incidentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subzonaid' })
  subZona: SubZone;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_creador_id' })
  usuarioCreador: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_rejected_id' })
  usuarioRejected: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_received_id' })
  usuarioReceived: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_commented_id' })
  usuarioCommented: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_corrected_id' })
  usuarioCorrected: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_closed_id' })
  usuarioClosed: User;

  @ManyToOne(() => User, (user) => user.incidentesCreados, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_approved_id' })
  usuarioApproved: User;

  @ManyToOne(() => Discipline, (discipline) => discipline.incidences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'disciplina_id' })
  disciplina: Discipline;

  @ManyToOne(
    () => IncidenceState,
    (incidenceState) => incidenceState.incidentes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'estado_id' })
  estado: IncidenceState;

  @OneToMany(
    () => IncidenceCategory,
    (incidenceCategory) => incidenceCategory.incidente,
  )
  incidenteCategorias: IncidenceCategory[];

  @OneToMany(() => Photo, (photo) => photo.incidente)
  fotos: Photo[];

  // Normal columns

  @Column({
    name: 'fecha_incidencia',
    type: 'varchar',
    nullable: true,
  })
  fechaIncidencia: string;

  @Column({
    name: 'fecha_rejected',
    type: 'varchar',
    nullable: true,
  })
  fechaRejected: string;

  @Column({
    name: 'fecha_received',
    type: 'varchar',
    nullable: true,
  })
  fechaReceived: string;

  @Column({
    name: 'fecha_commented',
    type: 'varchar',
    nullable: true,
  })
  fechaCommented: string;

  @Column({
    name: 'fecha_corrected',
    type: 'varchar',
    nullable: true,
  })
  fechaCorrected: string;

  @Column({
    name: 'fecha_closed',
    type: 'varchar',
    nullable: true,
  })
  fechaClosed: string;

  @Column({
    name: 'fecha_approved',
    type: 'varchar',
    nullable: true,
  })
  fechaApproved: string;

  @Column({ name: 'descripcion_incidencia', type: 'varchar', nullable: true })
  descripcionIncidencia: string;

  @Column({ name: 'accion_requerida', type: 'varchar', nullable: true })
  accionRequerida: string;

  @Column({
    name: 'fecha_limite',
    type: 'varchar',
    nullable: true,
  })
  fechaLimite: string;

  @Column({
    name: 'es_no_conformidad',
    type: 'bit',
    nullable: true,
  })
  esNoConformidad: boolean;

  @Column({
    name: 'codigo_nc',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  codigoNC: string;

  @Column({
    name: 'comentario_receptor',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  comentarioReceptor: string;

  @Column({
    name: 'resultado_receptor',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  resultadoReceptor: string;

  @Column({
    name: 'cod_incidente',
    type: 'varchar',
    nullable: true,
  })
  codIncidente: string;

  @Column({
    name: 'origen',
    type: 'int',
    default: 0,
  })
  origen: number;
}
