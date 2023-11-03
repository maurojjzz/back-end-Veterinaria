import { Entity, Property, ManyToOne, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Especie } from "../especie/especie.entity.js";

@Entity()
export class Raza extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;

    @ManyToOne(() => Especie, { nullable: false })
    especie!: Rel<Especie>;
}
