import { Repository } from "../shared/repository.js";
import { Especie } from "./especie.entity.js";

const especies: Especie[] = [
    new Especie(
        '07',
        'Felino'
    )
]

export class EspecieRepository implements  Repository<Especie>{
    findAll(): Promise< Especie[] | undefined> {
        throw new Error('Pronto');
    }
    findOne(item: { id: string }): Promise< Especie | undefined> {
        throw new Error('Pronto');
    }
    add(item: Especie): Promise< Especie | undefined> {
        throw new Error('Pronto')
    }
    update(id:string, item: Especie): Promise<Especie | undefined> {
        throw new Error('Pronto');
    }
    delete(item: { id: string }): Promise< Especie | undefined> {
        throw new Error('Pronto');
    }
}