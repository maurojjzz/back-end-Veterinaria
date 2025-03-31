# **Proyecto de Gestión de Veterinaria**

***

## **Información**
Este proyecto fue desarrollado por estudiantes de la Universidad Tecnológica Nacional Facultad Regional Rosario.

## **Descripción**
Esta aplicación web está diseñada para administración y gestión de veterinarias. Sus funcionalidades se centran en brindarle a los usuarios la posibilidad de gestionar sus mascotas y sacar turnos para las mismas, además de permitir a los veterinarios ver los turnos que se les han asignado y a un administrador gestionar todas las clases y componentes necesarios para el correcto funcionamiento de la veterinaria.

## **Documentación de la API**
Puedes encontrar la documentación de la API, hecha con Swagger, en `https://localhost:3080/api-docs`. 

## **Instalación**

### **Instalar Node.js**
El gestor de paquetes NPM viene con Node.js y es necesario para este proyecto.

#### **Windows:**
1. Descarga el instalador desde [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
2. Ejecuta el archivo `.msi` y sigue las instrucciones de instalación.
3. Verifica la instalación ejecutando los siguientes comandos en una nueva ventana de terminal:
    ```sh
    node -v
    npm -v
    ```

#### **Linux (Ubuntu):**
1. Abre la terminal.
2. Instala Node.js y NPM ejecutando:
    ```sh
    sudo apt update
    sudo apt install nodejs npm
    ```
3. Verifica la instalación:
    ```sh
    node -v
    npm -v
    ```

### **Clonar el Repositorio**
1. Abre la terminal.
2. Navega hasta el directorio deseado.
3. Ejecuta los siguientes comandos:
    ```sh
    git clone https://github.com/maurojjzz/back-end-Veterinaria.git
    cd back-end-Veterinaria
    ```

### **Configuración e instalación de dependencias** ###
1. Instala las dependencias del backend:
    ```sh
    npm install
    ```
2. Crea un archivo `.env` con las siguientes variables de entorno:
    ```env
DB_URI = mongodb+srv://vet-304-dsw:1mwu4GHek1snxoz5@veterinaria.mqiuzg1.mongodb.net/?retryWrites=true&w=majority
DB_URI_TEST = mongodb+srv://maurojim123:5rNMSHY9QGELkjX5@vetapptest.tx68qeo.mongodb.net/?retryWrites=true&w=majority 
DB_NAME = VetApp
PORT = 3080
ACCESS_TOKEN_SECRET = dab5b684ab2b12730dbed3d4fa014337586ce9a0ad42150c9b388bd7733613debce0357e39727edbc68359d8ea28e1be0d10705c68792d0bb296d6efb14bef3d
USER_TYPE_ID=65334d8d48ec52ff5e08c85a
    ```

### **Corriendo la aplicación** ###
El backend se ejecuta por defecto en el puerto 3080. Para iniciarlo, desde la carpeta `back-end-Veterinaria` que se creó en tu PC, ejecuta el siguiente comando en la terminal:
```sh
npm run start:dev
```
Nota: para correr la aplicación completa, luego de correr el backend, deberás correr el frontend, para lo cual puedes entrar a el siguiente repositorio: https://github.com/maurojjzz/Veterinaria-front-end, y seguir el instructivo de su README. Si no haces esto, simplemente estarás corriendo el backend, lo cual haría engorroso acceder a las funcionalidades, y para muchas lo volvería imposible.
Nota 2: Para los tests, se debe ejecutar el siguiente comando:
```sh
npm run start:test
```

### **Credenciales** ###
Para tener acceso a las credenciales necesarias para acceder a las funcionalidades de la app en sus distintos roles, vaya al siguiente link: https://github.com/maurojjzz/Veterinaria-front-end/blob/master/Documentation/Credentials.md. Allí encontrará los datos de acceso para los 3 roles de la aplicación.

### **Corriendo tests** ###
Para correr los tests, ejecuta el siguiente comando en tu terminal:

```sh
npm run test

```