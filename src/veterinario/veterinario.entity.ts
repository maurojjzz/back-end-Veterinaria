export class Veterinario{
    constructor(
        public matricula : string,
        public apellido: string,
        public nombre: string,
        public especialidad: string,
        public direccion: string,
        public telefono: number,
        public email: string,
        public password: string
    ){}
}