const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');
const lines = content.split('\n');
const line487 = lines[486]; // 0-indexed
console.log(`Line 487: "${line487}"`);
for (let i = 0; i < line487.length; i++) {
    console.log(`${i}: ${line487[i]} (${line487.charCodeAt(i)})`);
}
