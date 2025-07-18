require('dotenv').config();
const mysql = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

async function setupDatabase() {
    let connection;
    try {
        // Conexão inicial sem selecionar o banco de dados
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
        });

        // Cria o banco de dados se ele não existir
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
        console.log(`Banco de dados '${DB_DATABASE}' verificado/criado com sucesso.`);

        // Seleciona o banco de dados
        await connection.changeUser({ database: DB_DATABASE });
        console.log(`Banco de dados '${DB_DATABASE}' selecionado.`);

        // Cria a tabela de links se ela não existir
        await connection.query(`
            CREATE TABLE IF NOT EXISTS links (
                id INT NOT NULL AUTO_INCREMENT,
                original_url VARCHAR(2048) NOT NULL,
                short_id VARCHAR(10) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )
        `);
        console.log("Tabela 'links' verificada/criada com sucesso.");

    } catch (error) {
        console.error("Erro ao configurar o banco de dados:", error);
    } finally {
        if (connection) {
            await connection.end();
            console.log("Conexão com o banco de dados fechada.");
        }
    }
}

setupDatabase();
