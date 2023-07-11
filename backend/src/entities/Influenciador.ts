import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Canais } from "./Canais";
import { Contatos } from "./Contatos";
import { Votos } from "./Votos";

@Index("influenciadores_pkey", ["id"], { unique: true })
@Entity("influenciador", { schema: "public" })
export class Influenciador {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number = 0;

  @Column("text", { name: "nome", nullable: true })
  nome: string = '';

  @Column("text", { name: "fullname", nullable: true })
  fullname: string = '';

  @Column("text", { name: "nick", nullable: true })
  nick: string = '';

  @Column("text", { name: "senha", nullable: true })
  senha: string = '';

  @ManyToOne(() => Canais, (canais) => canais.influenciadors)
  @JoinColumn([{ name: "canal_id", referencedColumnName: "id" }])
  canal!: Canais;

  @ManyToOne(() => Contatos, (contatos) => contatos.influenciadors)
  @JoinColumn([{ name: "contato_id", referencedColumnName: "id" }])
  contato!: Contatos;

  @OneToMany(() => Votos, (votos) => votos.influenciador)
  votos!: Votos[];
}
