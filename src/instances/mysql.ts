import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const mysql = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as  string,
    
    {
        dialect: "mysql",
        host: process.env.MYSQL_HSOT,
        port: parseInt(process.env.MYSQL_PORT as string)
    }
)