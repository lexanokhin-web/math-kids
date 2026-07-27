const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');

const lines = content.split('\n');
const keys = new Set();
const duplicates = [];

lines.forEach((line, index) => {
    const match = line.match(/^\s*'(.+?)':/);
    if (match) {
        const key = match[1];
        if (keys.has(key)) {
            duplicates.push({ line: index + 1, key });
        } else {
            keys.add(key);
        }
    }
});

console.log(JSON.stringify(duplicates, null, 2));
