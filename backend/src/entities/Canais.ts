import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Influenciador } from "./Influenciador";

@Index("canais_pkey", ["id"], { unique: true })
@Entity("canais", { schema: "public" })
export class Canais {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "instagram", nullable: true })
  instagram!: string | null;

  @Column("text", { name: "youtube", nullable: true })
  youtube!: string | null;

  @Column("text", { name: "facebook", nullable: true })
  facebook: string | null;

  @Column("text", { name: "linkedin", nullable: true })
  linkedin: string | null;

  @Column("text", { name: "outros", nullable: true })
  outros: string | null;

  @OneToMany(() => Influenciador, (influenciador) => influenciador.canal)
  influenciadors!: Influenciador[];

  constructor(){
    this.id = 0;
    this.instagram = '';
    this.youtube = '';
    this.facebook = '';
    this.linkedin = '';
    this.outros = '';
  }
}
