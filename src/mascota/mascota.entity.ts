import {Entity, Property, ManyToOne, Rel, OneToMany, Cascade, Collection} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { Raza } from "../raza/raza.entity.js";
import { Atencion } from "../atencion/atencion.entity.js";

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

    @OneToMany(()=>Atencion, ate => ate.mascota, {cascade:[Cascade.ALL]})
    atenciones =  new Collection<Atencion>(this)

    
}

