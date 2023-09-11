import { Usuario } from "./usuario.entity.js";
import { Repository } from "../shared/repository.js";


const usuarios : Usuario[] = [
    new Usuario(
        '33as3',
        'User',
        'Account',
        'user@account.com',
        'pepito123',
        3413569854,
        'dni',
        45365541,
        'Los Arrayanez 2415',
        'masculino',
        'UserAccount'
    )
]


export class UsuarioRepository implements Repository<Usuario>{
    public findAll(): Usuario[] | undefined {
        return usuarios;
    }
    
    public findOne(item: { id: string }): Usuario | undefined {
        return usuarios.find((usu)=> usu.id_usuario === item.id)
    }

    public add(item: Usuario): Usuario | undefined {
        usuarios.push(item)
        return item;
    }

    public update(item: Usuario): Usuario | undefined {
        const characterIdx= usuarios.findIndex(usu => usu.id_usuario === item.id_usuario );

        if(characterIdx !== -1){
            usuarios[characterIdx] = {...usuarios[characterIdx], ...item}
        }

        return  usuarios[characterIdx]
    }

    public delete(item: { id: string; }): Usuario | undefined {
        const characterIdx= usuarios.findIndex(usu => usu.id_usuario === item.id );
        if(characterIdx !== -1){
           const characterDeleted = usuarios[characterIdx]
           usuarios.splice(characterIdx,1);
           return characterDeleted;
        }
    }

}