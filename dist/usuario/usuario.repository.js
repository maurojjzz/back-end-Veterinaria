import { UsuarioModel } from "./usuario.entity.js";
import * as mongoose from 'mongoose';
export class UsuarioRepository {
    async findAll() {
        return await UsuarioModel.find().populate('rol');
    }
    async findOne(item) {
        const _id = new mongoose.Types.ObjectId(item.id);
        return await UsuarioModel.findOne({ _id }) || undefined;
    }
    async add(item) {
        try {
            const user = new UsuarioModel(item);
            const savedUser = await user.save();
            return savedUser;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    async update(id, item) {
        const _id = new mongoose.Types.ObjectId(id);
        return (await UsuarioModel.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = new mongoose.Types.ObjectId(item.id);
        return (await UsuarioModel.findOneAndDelete({ _id })) || undefined;
    }
}
//# sourceMappingURL=usuario.repository.js.map