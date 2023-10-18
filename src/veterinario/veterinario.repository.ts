import { Repository } from "../shared/repository.js"
import { Veterinario } from "./veterinario.entity.js"

const veterinarios : Veterinario[] = [
    new Veterinario(
       '566ase',
       '335AADS87',
       'Clain',
       'Renata',
       'Avenida Siempre Viva 546',
       3466586566,
       'renataclain@gmail.com',
       'renatita10',
       'dni',
       93548778,
       'femenino'
    )
]
                
export class VeterinarioRepository implements Repository<Veterinario>{
    findAll(): Promise<Veterinario[] | undefined> {
        throw new Error('Pronto');
    }
    findOne(item: { id: string }): Promise<Veterinario | undefined> {
        throw new Error('Pronto');
    }
    add(item: Veterinario): Promise< Veterinario | undefined> {
        throw new Error('Pronto');
    }
    update(id:string, item: Veterinario): Promise< Veterinario | undefined> {
        throw new Error('Pronto');
    }
    delete(item: { id: string }): Promise< Veterinario | undefined >{
        throw new Error('Pronto');
    }

}