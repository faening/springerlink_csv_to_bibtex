const fs = require('fs');

function readCSVFile(fileName) {
    const content = fs.readFileSync(fileName, 'utf-8');
    const lines = content.split('\n');

    // Remove o cabeçalho
    if (lines.length > 0 && lines[0].includes(',')) {
        lines.shift();
    }

    return lines;
}

function formatToBibTeX(csvLine) {
    const fields = csvLine.split('","');
    const title = fields[0].replace('"', '').trim();
    const publicationTitle = fields[1].replace('"', '').trim();
    const bookSeriesTitle = fields[2].replace('"', '').trim();
    const journalVolume = fields[3].replace('"', '').trim();
    const journalIssue = fields[4].replace('"', '').trim();
    const itemDOI = fields[5].replace('"', '').trim();
    const authors = fields[6].replace('"', '').trim();
    const publicationYear = fields[7].replace('"', '').trim();
    const URL = fields[8].replace('"', '').trim();

    const bibTeXEntry = `@article{${itemDOI},\n` +
        `  author = {${authors}},\n` +
        `  title = {${title}},\n` +
        `  year = {${publicationYear}},\n` +
        `  journal = {${publicationTitle}},\n` +
        `  volume = {${journalVolume}},\n` +
        `  number = {${journalIssue}},\n` +
        `  doi = {${itemDOI}},\n` +
        `  url = {${URL}},\n` +
        `  source = {Springer Nature Switzerland},\n` +
        `}\n`;

    return bibTeXEntry;
}

const csvFileName = 'SearchResults.csv';
const csvLines = readCSVFile(csvFileName);
const bibTeXEntries = csvLines.map(formatToBibTeX);
const bibTeXFileName = 'file.bib';

fs.writeFileSync(bibTeXFileName, bibTeXEntries.join('\n'), 'utf-8');

console.log(`The BibTeX entries have been saved to the file "${bibTeXFileName}".`);
