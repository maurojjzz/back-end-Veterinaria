export class Usuario {
    constructor(
        public id_usuario: string,
        public nombre: string,
        public apellido: string,
        public email: string, 
        public password: string,
        public telefono: number,
        public tipo_doc: string,
        public nro_doc: number,
        public direccion: string,
        public sexo: string,
        public user: string,
        // public mascotas:string[]
        ) {}
}