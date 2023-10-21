import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Especie extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;
}
 
