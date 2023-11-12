var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, Collection, OneToMany, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Rol } from '../rol/rol.entity.js';
import { Atencion } from '../atencion/atencion.entity.js';
export let Veterinario = class Veterinario extends BaseEntity {
    constructor() {
        super(...arguments);
        this.atenciones = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Veterinario.prototype, "matricula", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Veterinario.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Veterinario.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Veterinario.prototype, "telefono", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Veterinario.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Veterinario.prototype, "password", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Veterinario.prototype, "nro_doc", void 0);
__decorate([
    ManyToOne(() => Rol, { nullable: false }),
    __metadata("design:type", Object)
], Veterinario.prototype, "rol", void 0);
__decorate([
    OneToMany(() => Atencion, ate => ate.veterinario, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Veterinario.prototype, "atenciones", void 0);
Veterinario = __decorate([
    Entity()
], Veterinario);
//# sourceMappingURL=veterinario.entity.js.map