require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// Pool de conexões com o banco de dados
const dbPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middlewares
app.use(express.json()); // Para parsear JSON
app.use(express.static(path.join(__dirname))); // Para servir arquivos estáticos (HTML, CSS, JS)

// Rota para encurtar o link
app.post('/encurtar', async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'URL original é obrigatória' });
    }

    try {
        const shortId = nanoid(8);
        const query = 'INSERT INTO links (original_url, short_id) VALUES (?, ?)';
        await dbPool.query(query, [originalUrl, shortId]);

        const shortUrl = `http://localhost:${port}/${shortId}`;
        res.status(201).json({ shortUrl });

    } catch (error) {
        console.error("Erro ao criar link encurtado:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para redirecionar
app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    try {
        const query = 'SELECT original_url FROM links WHERE short_id = ?';
        const [rows] = await dbPool.query(query, [shortId]);

        if (rows.length > 0) {
            res.redirect(rows[0].original_url);
        } else {
            res.status(404).send('Link não encontrado');
        }
    } catch (error) {
        console.error("Erro ao redirecionar:", error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
