import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Rol } from '../rol/rol.entity.js'
import { Mascota } from '../mascota/mascota.entity.js'

export class Usuario {

    @prop({ type: String, required: true, maxlength: 50, minlength: 3 })
    public nombre: string

    @prop({ type: String, required: true, maxlength: 50, minlength: 3 })
    public apellido: string

    @prop({ type: String, required:true, unique: true, trim: true, match: /^\S+@\S+\.\S+$/ })
    public email: string

    @prop({type: String, required:true, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/})
    public password: string

    @prop({ type: Number, unique:true})
    public telefono: number

    @prop({ type: String, required:true, match: /^[0-9]{7,8}$/})
    public nro_doc: string

    @prop({ type: String})
    public direccion: string

    @prop({ref:()=> Rol})
    public rol:Ref<Rol>

    @prop({ ref:()=>Mascota })
    public mascotas: Ref<Mascota>[]

}

export const UsuarioModel = getModelForClass(Usuario);