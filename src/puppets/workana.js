const fs = require('fs');

async function getWorkanaVacancies(page, search, additionalPages){
    let jobsList = [];
    let counter = 1;

    while(counter < additionalPages){
        page.goto(`https://www.workana.com/jobs?language=pt&query=${search}`);

        for(let i = 0; i < additionalPages ;i++){
            await page.keyboard.down('Control');
            await page.keyboard.press('End');
            await page.keyboard.up('Control');
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        //console.log("feito");

        const list = await page.evaluate(() => {
            const nodeList = document.querySelectorAll('.project-title > a');
            const textArray = [...nodeList]
            const list = textArray.map( ({href, innerText}) => ({
                href, innerText
            }));
            return list
        });

        console.log("feito");

        jobsList = [...jobsList, ...list];

        counter++;
    }

    console.log(jobsList);

    fs.writeFile('./src/data/workana.json', JSON.stringify(jobsList, null, 2), err => {
        if (err) {
            throw new Error('Alguma coisa deu errada')
        }

        console.log(`Vagas atualizadas`);
    })
}

module.exports = { getWorkanaVacancies };