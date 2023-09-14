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
    findAll(): Veterinario[] | undefined {
        return veterinarios;
    }
    findOne(item: { id: string }): Veterinario | undefined {
        return veterinarios.find((vet)=> vet.id_veterinario === item.id)
    }
    add(item: Veterinario): Veterinario | undefined {
        veterinarios.push(item)
        return(item)
    }
    update(item: Veterinario): Veterinario | undefined {
        const vetIdx= veterinarios.findIndex(vet => vet.id_veterinario === item.id_veterinario );

        if(vetIdx !== -1){
            veterinarios[vetIdx] = {...veterinarios[vetIdx], ...item}
        }
        return  veterinarios[vetIdx]
    }
    delete(item: { id: string }): Veterinario | undefined {
        const vetIdx= veterinarios.findIndex(vet => vet.id_veterinario === item.id );
        if(vetIdx !== -1){
           const veterinaryDeleted = veterinarios[vetIdx]
           veterinarios.splice(vetIdx,1);
           return veterinaryDeleted;
        }
    }

}