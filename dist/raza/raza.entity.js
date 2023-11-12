var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Especie } from "../especie/especie.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";
41;
export let Raza = class Raza extends BaseEntity {
    constructor() {
        super(...arguments);
        this.mascotas = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Raza.prototype, "descripcion", void 0);
__decorate([
    ManyToOne(() => Especie, { nullable: false }),
    __metadata("design:type", Object)
], Raza.prototype, "especie", void 0);
__decorate([
    OneToMany(() => Mascota, mas => mas.raza, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Raza.prototype, "mascotas", void 0);
Raza = __decorate([
    Entity()
], Raza);
//# sourceMappingURL=raza.entity.js.map