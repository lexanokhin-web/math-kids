const fs = require('fs');
const path = 'c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Delete lines 486 to 520 (indices 485 to 519)
// Note: I'll also check if line 521 is blank and remove it if so.
const resultLines = [];
for (let i = 0; i < lines.length; i++) {
    if (i >= 485 && i <= 519) {
        continue;
    }
    // Also remove the blank line that was at 521 (now it would be at index 520 if we didn't skip)
    if (i === 520 && lines[i].trim() === '') {
        continue;
    }
    resultLines.push(lines[i]);
}

fs.writeFileSync(path, resultLines.join('\n'), 'utf8');
console.log('Cleaned up translationData.ts');
