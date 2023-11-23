import {Entity, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Atencion } from "../atencion/atencion.entity.js";

@Entity()
export class Pago extends BaseEntity {

    @Property({nullable:false})
    importe!: number

    @Property({nullable:false})
    forma_de_pago!: string

    @Property({nullable:false})
    cuotas!: number

    @Property({unique:true})
    nro_cuota!: number

    @Property({nullable:true})
    fecha_hora_pago!:Date;

    @ManyToOne(()=> Atencion, {nullable:false})
    atencion!: Rel<Atencion>;

}
