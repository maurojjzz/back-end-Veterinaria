import { Entity, Property, ManyToMany, Collection, OneToMany, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Atencion } from "../atencion/atencion.entity.js";
import { Precio } from "../precio/precio.entity.js";

@Entity()
export class Practica extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string

    @ManyToMany(()=> Atencion, (ate)=> ate.practicas)
    atenciones= new Collection<Atencion>(this)

    @OneToMany(()=>Precio, pre => pre.practica, {cascade:[Cascade.ALL]})
    precios =  new Collection<Precio>(this)

}