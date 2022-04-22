import {Model, DataTypes} from "sequelize"
import {mysql} from "../instances/mysql"

interface userInstance extends Model {
    id: number,
    username: string,
    email: string,
    password: string,
    avatar: string,
}

export const User = mysql.define<userInstance>("User", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    avatar: {
        allowNull: true,
        type: DataTypes.STRING,
    },
},
    {
        tableName: "Users",
        timestamps: false,
    }
)