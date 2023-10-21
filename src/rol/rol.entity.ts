import {Cascade, Collection, Entity, OneToMany, Property} from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Usuario } from "../usuario/usuario.entity.js";

@Entity()
export class Rol extends BaseEntity{
    @Property({nullable:false, unique:true})
    descripcion!: string;

    @OneToMany(()=>Usuario, usu=> usu.rol, {cascade:[Cascade.ALL]})
    usuarios = new Collection<Usuario>(this)
}
