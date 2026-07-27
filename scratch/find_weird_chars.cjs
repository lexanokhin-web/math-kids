const fs = require('fs');
const content = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');

for (let i = 0; i < content.length; i++) {
    const code = content.charCodeAt(i);
    if (code > 127 && code < 1024) { // Non-ASCII, but excluding Russian characters (which are > 1024)
        // console.log(`Non-ASCII char at index ${i}: ${content[i]} (code ${code})`);
    }
}

// Just output any line that contains characters outside the typical range
const lines = content.split('\n');
lines.forEach((line, index) => {
    for (let char of line) {
        const code = char.charCodeAt(0);
        // Russian is roughly 1024-1279
        // German umlauts are in 128-255
        if (code > 255 && (code < 1024 || code > 1279)) {
             if (char !== '—' && char !== '…' && char !== '«' && char !== '»') {
                console.log(`Line ${index + 1} has weird char: ${char} (${code})`);
             }
        }
    }
});
