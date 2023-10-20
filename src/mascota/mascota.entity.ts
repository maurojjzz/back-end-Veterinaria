import { prop, getModelForClass } from '@typegoose/typegoose'

export class Mascota{

    @prop()
    public nombre:string;
    @prop()
    public sexo:string;
    @prop()
    public fecha_nacimiento:Date;
    @prop()
    public raza:string;
    @prop()
    public especie:string;
    @prop()
    public owner:string;
}

export const MascotaModel = getModelForClass(Mascota);