var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Collection, ManyToOne, OneToMany, Cascade } from "@mikro-orm/core";
import { Rol } from '../rol/rol.entity.js';
import { Mascota } from '../mascota/mascota.entity.js';
import { BaseEntity } from "../shared/db/baseEntity.js";
export let Usuario = class Usuario extends BaseEntity {
    constructor() {
        super(...arguments);
        this.mascotas = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nro_doc", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "direccion", void 0);
__decorate([
    ManyToOne(() => Rol, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "rol", void 0);
__decorate([
    OneToMany(() => Mascota, mas => mas.owner, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Usuario.prototype, "mascotas", void 0);
Usuario = __decorate([
    Entity()
], Usuario);
//# sourceMappingURL=usuario.entity.js.map