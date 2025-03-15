import {Entity, Property, Collection, ManyToOne, OneToMany, Rel, Cascade, ManyToMany, } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Veterinario } from "../veterinario/veterinario.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";
import { Practica } from "../practica/practica.entity.js";
import { Pago } from "../pago/pago.entity.js";

@Entity()
export class Atencion extends BaseEntity {

    @Property({nullable:false})
    fecha_hora_atencion!:Date;

    @Property({nullable:true})
    forma_de_pago!: string

    @Property({nullable:true})
    importe!: number

    @ManyToOne(()=>Veterinario, {nullable:true})
    veterinario!: Rel<Veterinario>;

    @ManyToOne(()=>Mascota, {nullable:false})
    mascota!: Rel<Mascota>
    
    @ManyToMany(()=>Practica, (pra)=>pra.atenciones , {cascade: [Cascade.ALL], owner:true})
    practicas!: Practica[]

    @OneToMany(()=>Pago, pag => pag.atencion, {cascade:[Cascade.ALL]})
    pagos =  new Collection<Pago>(this)

}
