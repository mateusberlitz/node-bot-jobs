const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8000;

const { runBot } = require('./bot');

app.get('/vacancies', (req, res) => {
    // const linkedinVacancies = fs.readFile("./src/data/linkedin.json", "utf8", (err, data) => {
    //     if (err) {
    //         throw new Error(err.message)
    //     }

    //     //console.log(data);

    //     return data;
    // });

    try {
        const linkedinVacanciesJson = fs.readFileSync("./src/data/linkedin.json");
        const linkedinVacancies = JSON.parse(linkedinVacanciesJson);

        res.send(linkedinVacancies);

    } catch (err) {
        console.log(err);
        return;
    }
});

app.get('/jobs', (req, res) => {
    try {
        const workanaVacanciesJson = fs.readFileSync("./src/data/workana.json");
        const workanaVacancies = JSON.parse(workanaVacanciesJson);

        res.send(workanaVacancies);

    } catch (err) {
        console.log(err);
        return;
    }
});

app.get('/update', (req, res) => {
    runBot();

    res.send("Processo de atualização das vagas inicializado...");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});