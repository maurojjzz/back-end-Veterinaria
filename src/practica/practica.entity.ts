import { Entity, Property, ManyToMany, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Atencion } from "../atencion/atencion.entity.js";

@Entity()
export class Practica extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;

    @ManyToMany(()=> Atencion, (ate)=> ate.practicas)
    atenciones= new Collection<Atencion>(this);

}