import {Entity, Property, Collection, ManyToOne, OneToMany, Rel, Cascade} from "@mikro-orm/core"
import { Rol } from '../rol/rol.entity.js'
import { Mascota } from '../mascota/mascota.entity.js'
import { BaseEntity } from "../shared/db/baseEntity.js"

@Entity()
export class Usuario extends BaseEntity {

    @Property({nullable:false})
    nombre!: string

    @Property({nullable:false})
    apellido!: string

    @Property({nullable:false, unique:true})
    email!: string

    @Property({nullable:false})
    password!: string

    @Property({nullable:false, unique:true})
    telefono!: string

    @Property({nullable:false, unique:true})
    nro_doc!: string

    @Property({nullable:false})
    direccion!: string

    @ManyToOne(()=>Rol, {nullable:false})
    rol!: Rel<Rol>

    @OneToMany(()=>Mascota, mas => mas.owner, {cascade:[Cascade.ALL]})
    mascotas =  new Collection<Mascota>(this)

}
