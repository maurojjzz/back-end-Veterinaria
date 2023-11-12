var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, Cascade, ManyToMany, } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Veterinario } from "../veterinario/veterinario.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";
import { Practica } from "../practica/practica.entity.js";
export let Atencion = class Atencion extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Atencion.prototype, "fecha_hora_atencion", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Atencion.prototype, "forma_de_pago", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Atencion.prototype, "importe", void 0);
__decorate([
    ManyToOne(() => Veterinario, { nullable: false }),
    __metadata("design:type", Object)
], Atencion.prototype, "veterinario", void 0);
__decorate([
    ManyToOne(() => Mascota, { nullable: false }),
    __metadata("design:type", Object)
], Atencion.prototype, "mascota", void 0);
__decorate([
    ManyToMany(() => Practica, (pra) => pra.atenciones, { cascade: [Cascade.ALL], owner: true }),
    __metadata("design:type", Array)
], Atencion.prototype, "practicas", void 0);
Atencion = __decorate([
    Entity()
], Atencion);
//# sourceMappingURL=atencion.entity.js.map