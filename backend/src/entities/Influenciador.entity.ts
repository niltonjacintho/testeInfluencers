import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("influenciadores_pkey", ["id"], { unique: true })
@Entity("influenciador", { schema: "public" })
export class Influenciador {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "nome", nullable: true })
  nome: string | null;

  @Column("text", { name: "fullname", nullable: true })
  fullname: string | null;

  @Column("text", { name: "nick", nullable: true })
  nick: string | null;

  @Column("text", { name: "senha", nullable: true })
  senha: string | null;

  @Column("character varying", {
    name: "telefone",
    nullable: true,
    length: 100,
  })
  telefone: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", {
    name: "instagram",
    nullable: true,
    length: 100,
  })
  instagram: string | null;

  @Column("character varying", { name: "youtube", nullable: true, length: 100 })
  youtube: string | null;

  @Column("character varying", {
    name: "facebook",
    nullable: true,
    length: 100,
  })
  facebook: string | null;

  @Column("character varying", { name: "outros", nullable: true, length: 100 })
  outros: string | null;

  @Column("integer", { name: "votos", default: () => "0" })
  votos: number;

  @Column("text", { name: "uf", default: () => " " })
  uf: string;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.fullname = '';
    this.nick = '';
    this.senha = '';
    this.telefone = '';
    this.email = '';
    this.instagram = '';
    this.youtube = '';
    this.facebook = '';
    this.outros = '';
    this.votos = 0;
    this.uf = '';
  }
}
