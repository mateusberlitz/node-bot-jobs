const fs = require('fs');

async function getLinkedinVacancies(page, search, additionalPages){
    page.goto(`https://www.linkedin.com/jobs/${search}-jobs-brasil?geoId=106057199&countryRedirected=1&position=1&pageNum=0`);

    // Rola até o fim da página, baseado no additionalPages, sempre agaurdando 3 segundos para carregar mais vagas.
    for(let i = 0; i < additionalPages ;i++){
        await page.keyboard.down('Control');
        await page.keyboard.press('End');
        await page.keyboard.up('Control');
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    const list = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('a[data-tracking-control-name="public_jobs_jserp-result_search-card"]');
        const textArray = [...nodeList]
        const list = textArray.map( ({href, innerText}) => ({
            href, innerText
        }));
        return list
    });

    fs.writeFile('./src/data/linkedin.json', JSON.stringify(list, null, 2), err => {
        if (err) {
            throw new Error('Alguma coisa deu errada')
        }

        console.log(`Vagas atualizadas`);
    })
}

module.exports = { getLinkedinVacancies };