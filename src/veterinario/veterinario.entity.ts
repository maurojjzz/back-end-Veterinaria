export class Veterinario{
    constructor(
        public id_veterinario:string,
        public matricula : string,
        public apellido: string,
        public nombre: string,
        public direccion: string,
        public telefono: number,
        public email: string,
        public password: string,
        public tipo_doc: string,
        public nro_doc: number,
        public sexo: string
    ){}
}