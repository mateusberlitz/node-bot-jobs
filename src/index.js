const express = require('express');
const app = express();
const PORT = 8000;

app.get('/vacancies', (req, res) => {
    res.send('vagas');
});

app.get('/jobs', (req, res) => {
    res.send('vagas');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});