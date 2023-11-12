var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToMany, Collection, OneToMany, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Atencion } from "../atencion/atencion.entity.js";
import { Precio } from "../precio/precio.entity.js";
export let Practica = class Practica extends BaseEntity {
    constructor() {
        super(...arguments);
        this.atenciones = new Collection(this);
        this.precios = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Practica.prototype, "descripcion", void 0);
__decorate([
    ManyToMany(() => Atencion, (ate) => ate.practicas),
    __metadata("design:type", Object)
], Practica.prototype, "atenciones", void 0);
__decorate([
    OneToMany(() => Precio, pre => pre.practica, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Practica.prototype, "precios", void 0);
Practica = __decorate([
    Entity()
], Practica);
//# sourceMappingURL=practica.entity.js.map