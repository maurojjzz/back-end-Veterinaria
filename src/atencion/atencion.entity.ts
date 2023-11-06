import {Entity, Property, Collection, ManyToOne, OneToMany, Rel, Cascade, ManyToMany, } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Veterinario } from "../veterinario/veterinario.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";
import { Practica } from "../practica/practica.entity.js";

@Entity()
export class Atencion extends BaseEntity {

    @Property({nullable:false})
    fecha_hora_atencion!:Date;

    @Property()
    forma_de_pago!: string

    @Property()
    importe!: number

    @ManyToOne(()=>Veterinario, {nullable:false})
    veterinario!: Rel<Veterinario>;

    @ManyToOne(()=>Mascota, {nullable:false})
    mascota!: Rel<Mascota>
    
    @ManyToMany(()=>Practica, (pra)=>pra.atenciones , {cascade: [Cascade.ALL], owner:true})
    practicas!: Practica[]

}
