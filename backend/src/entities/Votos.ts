import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Influenciador } from "./Influenciador";

@Index("votos_pkey", ["id"], { unique: true })
@Entity("votos", { schema: "public" })
export class Votos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @ManyToOne(() => Influenciador, (influenciador) => influenciador.votos)
  @JoinColumn([{ name: "influenciador_id", referencedColumnName: "id" }])
  influenciador!: Influenciador;
}
