import {Entity, Property, ManyToOne, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Rol } from '../rol/rol.entity.js';

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

}