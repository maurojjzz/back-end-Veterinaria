import { Entity, Property, ManyToOne, OneToMany, Rel, Cascade, Collection} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Especie } from "../especie/especie.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";

41

@Entity()
export class Raza extends BaseEntity {

    @Property({ nullable: false })
    descripcion!: string;

    @ManyToOne(() => Especie, { nullable: false })
    especie!: Rel<Especie>;

    @OneToMany(()=> Mascota, mas => mas.raza, {cascade:[Cascade.ALL]})
    mascotas = new Collection<Mascota>(this)
}
