import { prop, getModelForClass, modelOptions} from '@typegoose/typegoose'

@modelOptions({ schemaOptions:{collection: 'roles'}})
export class Rol{
    @prop()
    public descripcion: string;
}

export const RolModel = getModelForClass(Rol);