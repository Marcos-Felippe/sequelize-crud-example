require('dotenv').config();

module.exports = {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true,
    }
};