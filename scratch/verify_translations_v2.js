import fs from 'fs';

const sentencesData = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/sentencesData.ts', 'utf8');
const translationData = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');

// Extract lolaStoriesLvl4 content
const startIdx = sentencesData.indexOf('export const lolaStoriesLvl4: string[] = [');
const endIdx = sentencesData.indexOf('];', startIdx);
const storiesContent = sentencesData.substring(startIdx, endIdx);

// Match strings in single quotes
const stories = [];
const regex = /'([^']*)'/g;
let match;
while ((match = regex.exec(storiesContent)) !== null) {
    stories.push(match[1]);
}

console.log(`Found ${stories.length} stories in sentencesData.ts`);

let missing = 0;
stories.forEach((story, index) => {
    if (!translationData.includes(story)) {
        console.log(`Missing translation for story ${index + 1}: ${story.substring(0, 50)}...`);
        missing++;
    }
});

console.log(`Missing translations: ${missing}`);
