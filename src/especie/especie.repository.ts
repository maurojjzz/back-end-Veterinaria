import { Repository } from "../shared/repository.js";
import { Especie } from "./especie.entity.js";

const especies: Especie[] = [
    new Especie(
        '07',
        'Felino'
    )
]

export class EspecieRepository implements Repository<Especie>{
    findAll(): Especie[] | undefined {
        return especies;
    }
    findOne(item: { id: string }): Especie | undefined {
        return especies.find((esp)=> esp.cod_especie === item.id)
    }
    add(item: Especie): Especie | undefined {
        especies.push(item)
        return(item)
    }
    update(item: Especie): Especie | undefined {
        const especieIdx= especies.findIndex(esp => esp.cod_especie === item.cod_especie );

        if(especieIdx !== -1){
            especies[especieIdx] = {...especies[especieIdx], ...item}
        }
        return  especies[especieIdx]
    }
    delete(item: { id: string }): Especie | undefined {
        const especieIdx= especies.findIndex(esp => esp.cod_especie === item.id );
        if(especieIdx !== -1){
           const especieDeleted = especies[especieIdx]
           especies.splice(especieIdx,1);
           return especieDeleted;
        }
    }
}