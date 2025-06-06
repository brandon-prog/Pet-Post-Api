import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { PetPost } from "./models/pet-post.model";

interface Options {
    host: string;
    port: number;
    username: string;
    password: string
    database: string;
}

/** 
 * Clase para gestionar la conexión a una base de datos de postgreSQL utilizando TypeORM.
 * 
 * @remarks
 * eesta clase configura y administra la conexión a una base de datos, incluyendo la inicialización y cierre de la conexión.
 * Las entidades: User, Pet, Doctor, Specie y Appointment,
 * 
 * la conexión se figura para sincronizar el esquema de la base de datos y utiliza SSL con
 * ´rejecutaUnauthorized: false´ para evitar errores en entornos de desarrollo.
 * 
 * @example
 * ´´´typescript
 * const database = new PostgresDatabase({
 *   host: 'localhost',
 *   port: 5432,
 *   username: "postgres",
 *   password: "password",
 *   database: "veterinary",
 *  });
 * 
 * database.connect().then(() => {}).catch((error) => console.error(error));
 * ´´´
 */
export class PostgresDatabase {
    public datasource: DataSource;

    /**
     * Crea una instancia de la conexión a PostgreSQL.
     * 
     * @param options - Opciones de configuración para la conexión a la base de datos.
     */
    constructor(options: Options) {
        this.datasource = new DataSource({
            type: "postgres",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [User, PetPost],
            ssl: {
            rejectUnauthorized: false,
            },
});
}
/** 
 * Inicia la conexión a la base de datos.
 * 
 * @remarks
 * Este método debe ser llamado para establecer la conexión a la base de datos.
 * y muestra un mensaje en consola si la conexión fue exitosa o no.
 * 
 * @returns Promesa que se resuelve cuando la conexión es exitosa y se rechaza si hay un error.
 */
async connect() {
    try {
        await this.datasource.initialize();
        console.log('connected to database');
    } catch (error) {
        console.error(error);
}
}
}