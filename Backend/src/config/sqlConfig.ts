import dotenv from 'dotenv';
dotenv.config();
export const sqlConfig = {
    user: process.env.DB_USER as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PWD as string,
    server: process.env.SERVER as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}