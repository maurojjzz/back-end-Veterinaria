import {Entity, Property, ManyToOne, Rel} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { Raza } from "../raza/raza.entity.js";

@Entity()
export class Mascota extends BaseEntity{

    @Property({nullable:false})
    nombre!:string;

    @Property({nullable:false})
    sexo!:string;

    @Property()
    fecha_nacimiento!:Date;

    @ManyToOne(()=> Usuario, {nullable:false})
    owner!: Rel<Usuario>;

    @ManyToOne(()=> Raza, {nullable:false})
    raza!: Rel<Raza>;


    
}

