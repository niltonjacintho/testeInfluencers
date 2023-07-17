"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Influenciador = void 0;
const typeorm_1 = require("typeorm");
let Influenciador = exports.Influenciador = class Influenciador {
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
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
], Influenciador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "nome", nullable: true })
], Influenciador.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "fullname", nullable: true })
], Influenciador.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "nick", nullable: true })
], Influenciador.prototype, "nick", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "senha", nullable: true })
], Influenciador.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "telefone",
        nullable: true,
        length: 100,
    })
], Influenciador.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "email", nullable: true, length: 100 })
], Influenciador.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "instagram",
        nullable: true,
        length: 100,
    })
], Influenciador.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "youtube", nullable: true, length: 100 })
], Influenciador.prototype, "youtube", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "facebook",
        nullable: true,
        length: 100,
    })
], Influenciador.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "outros", nullable: true, length: 100 })
], Influenciador.prototype, "outros", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "votos", default: () => "0" })
], Influenciador.prototype, "votos", void 0);
exports.Influenciador = Influenciador = __decorate([
    (0, typeorm_1.Index)("influenciadores_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("influenciador", { schema: "public" })
], Influenciador);
