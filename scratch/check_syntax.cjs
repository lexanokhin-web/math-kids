const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');
const lines = content.split('\n');

let totalQuotes = 0;
for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i];
    let lineQuotes = 0;
    let escaped = false;
    for (let char of lineContent) {
        if (escaped) { escaped = false; continue; }
        if (char === '\\') { escaped = true; continue; }
        if (char === "'") lineQuotes++;
    }
    totalQuotes += lineQuotes;
    if (lineQuotes % 2 !== 0) {
        console.log(`Line ${i + 1} has an odd number of quotes (${lineQuotes}): ${lineContent.trim()}`);
    }
}
console.log(`Total quotes: ${totalQuotes}`);
