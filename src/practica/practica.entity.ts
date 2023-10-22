import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";

@Entity()
export class Practica extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;
}