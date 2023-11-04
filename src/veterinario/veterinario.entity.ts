import {Entity, Property, ManyToOne, Rel, ManyToMany, Collection, OneToMany, Cascade} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Rol } from '../rol/rol.entity.js';
import { Atencion } from '../atencion/atencion.entity.js';

@Entity()
export class Veterinario extends BaseEntity{
    
    @Property({nullable:false, unique:true})
    matricula!: string

    @Property({nullable:false})
    apellido!: string

    @Property({nullable:false})
    nombre!: string

    @Property({nullable:false, unique:true})
    telefono!: string

    @Property({nullable:false, unique:true})
    email!: string

    @Property({nullable:false})
    password!: string

    @Property({nullable:false, unique:true})
    nro_doc!: string

    @ManyToOne(()=> Rol, {nullable:false})
    rol!: Rel<Rol>;

    @OneToMany(()=>Atencion, ate => ate.veterinario, {cascade:[Cascade.ALL]})
    atenciones =  new Collection<Atencion>(this)


}