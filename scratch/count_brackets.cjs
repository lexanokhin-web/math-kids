const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');

let curly = 0;
let square = 0;
let round = 0;
let singleQuote = false;
let doubleQuote = false;
let comment = false;
let multiComment = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i+1];
    
    if (comment) {
        if (char === '\n') comment = false;
        continue;
    }
    if (multiComment) {
        if (char === '*' && next === '/') {
            multiComment = false;
            i++;
        }
        continue;
    }
    if (singleQuote) {
        if (char === "'" && content[i-1] !== '\\') singleQuote = false;
        continue;
    }
    if (doubleQuote) {
        if (char === '"' && content[i-1] !== '\\') doubleQuote = false;
        continue;
    }
    
    if (char === '/' && next === '/') { comment = true; i++; continue; }
    if (char === '/' && next === '*') { multiComment = true; i++; continue; }
    if (char === "'") { singleQuote = true; continue; }
    if (char === '"') { doubleQuote = true; continue; }
    
    if (char === '{') curly++;
    if (char === '}') curly--;
    if (char === '[') square++;
    if (char === ']') square--;
    if (char === '(') round++;
    if (char === ')') round--;
}

console.log(`Curly: ${curly}`);
console.log(`Square: ${square}`);
console.log(`Round: ${round}`);
