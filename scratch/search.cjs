const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('Der kleine Igel sucht Futter')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
