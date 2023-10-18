import { UsuarioModel} from "./usuario.entity.js";
import { Repository } from "../shared/repository.js";
import * as mongoose from 'mongoose'
import { DocumentType } from "@typegoose/typegoose";


export class UsuarioRepository implements Repository<DocumentType<typeof UsuarioModel>>{

    public async findAll(): Promise< DocumentType<typeof UsuarioModel>[]  | undefined> {
        return await UsuarioModel.find().populate('rol');
    }
    
    public async findOne(item: { id: string }):Promise< DocumentType<typeof UsuarioModel >| undefined> {
        const _id = new mongoose.Types.ObjectId(item.id);
        return await UsuarioModel.findOne({_id}) || undefined;
    }

    public async add(item: DocumentType<typeof UsuarioModel>): Promise<DocumentType<typeof UsuarioModel> | undefined> {
        try{
        const user = new UsuarioModel(item);
        const savedUser = await user.save();
        return savedUser as unknown as DocumentType<typeof UsuarioModel>
        } catch(error){
            console.error(error)
            return undefined;
        }
    }

    public async update(id:string, item: DocumentType<typeof UsuarioModel> ):Promise< DocumentType<typeof UsuarioModel> | undefined> {
        const _id = new mongoose.Types.ObjectId(id);
        return (await UsuarioModel.findOneAndUpdate({_id}, {$set: item}, {returnDocument: 'after'})) || undefined
    }

    public async delete(item: { id: string; }): Promise<DocumentType<typeof UsuarioModel> | undefined> {
        const _id = new mongoose.Types.ObjectId(item.id);
        return (await UsuarioModel.findOneAndDelete({_id})) || undefined
    }

}