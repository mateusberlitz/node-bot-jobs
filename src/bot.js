const puppeteer = require('puppeteer');
const fs = require('fs');
const prompt = require('prompt');

const {getLinkedinVacancies} = require('./puppets/linkedin');
const {getWorkanaVacancies} = require('./puppets/workana');

async function bot(search, additionalPages){
    await console.log("Atualizando vagas...🔎")

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await getLinkedinVacancies(page, search, additionalPages);
    await getWorkanaVacancies(page, search, additionalPages);

    browser.close();
}

async function runBot (){
    // await prompt.start();
    // const input = await prompt.get(['pages', 'search']);
    const search = ("mídias sociais").replace(' ','-').trim().toLowerCase()
    const pagesInput = 5
    
    //setInterval( function() { bot(search,pagesInput); }, 19000 );
    bot(search,pagesInput);
}

runBot();

module.exports = { runBot };