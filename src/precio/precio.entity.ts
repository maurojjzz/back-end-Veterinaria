import { Entity, Property, ManyToOne, Rel } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Practica } from "../practica/practica.entity.js"

@Entity()
export class Precio extends BaseEntity {

    @Property({ nullable: false })
    fecha!: Date

    @Property({ nullable: false })
    valor!: number

    @ManyToOne(() => Practica, { nullable: false })
    practica!: Rel<Practica>

}
