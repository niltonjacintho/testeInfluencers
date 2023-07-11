import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Influenciador } from "./Influenciador";

@Index("contatos_pkey", ["id"], { unique: true })
@Entity("contatos", { schema: "public" })
export class Contatos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "telefone", nullable: true })
  telefone: string | null;

  @Column("text", { name: "whatsapp", nullable: true })
  whatsapp: string | null;

  @Column("text", { name: "email", nullable: true })
  email: string | null;

  @Column("boolean", { name: "telefone_igual_whatsapp", nullable: true })
  telefoneIgualWhatsapp: boolean | null;

  @OneToMany(() => Influenciador, (influenciador) => influenciador.contato)
  influenciadors!: Influenciador[];

  constructor() {
    this.telefone = '';
    this.whatsapp = '';
    this.email = '';
    this.telefoneIgualWhatsapp = true;

  }
}
