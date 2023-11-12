var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, OneToMany, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Raza } from "../raza/raza.entity.js";
export let Especie = class Especie extends BaseEntity {
    constructor() {
        super(...arguments);
        this.razas = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Especie.prototype, "descripcion", void 0);
__decorate([
    OneToMany(() => Raza, raza => raza.especie, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], Especie.prototype, "razas", void 0);
Especie = __decorate([
    Entity()
], Especie);
//# sourceMappingURL=especie.entity.js.map