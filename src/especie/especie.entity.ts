import { Entity, Property, OneToMany, Cascade, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Raza } from "../raza/raza.entity.js";

@Entity()
export class Especie extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;

    @OneToMany(() => Raza, raza => raza.especie, { cascade: [Cascade.ALL] })
    razas = new Collection<Raza>(this);
}
 
