var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Atencion } from "../atencion/atencion.entity.js";
export let Pago = class Pago extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Pago.prototype, "importe", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Pago.prototype, "forma_de_pago", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Pago.prototype, "cuotas", void 0);
__decorate([
    Property({ unique: true }),
    __metadata("design:type", Number)
], Pago.prototype, "nro_cuota", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Pago.prototype, "fecha_hora_pago", void 0);
__decorate([
    ManyToOne(() => Atencion, { nullable: false }),
    __metadata("design:type", Object)
], Pago.prototype, "atencion", void 0);
Pago = __decorate([
    Entity()
], Pago);
//# sourceMappingURL=pago.entity.js.map