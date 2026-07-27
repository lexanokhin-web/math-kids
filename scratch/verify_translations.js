import fs from 'fs';

const sentencesData = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/sentencesData.ts', 'utf8');
const translationData = fs.readFileSync('c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/utils/translationData.ts', 'utf8');

// Simple regex to extract stories between [ and ] for lolaStoriesLvl4
const storiesMatch = sentencesData.match(/export const lolaStoriesLvl4: string\[\] = \[([\s\S]*?)\];/);
if (!storiesMatch) {
    console.log("Could not find lolaStoriesLvl4");
    process.exit(1);
}

const stories = storiesMatch[1]
    .split(',')
    .map(s => s.trim().replace(/^'|'$/g, ''))
    .filter(s => s.length > 0);

console.log(`Found ${stories.length} stories in sentencesData.ts`);

let missing = 0;
stories.forEach((story, index) => {
    if (!translationData.includes(story)) {
        console.log(`Missing translation for story ${index + 1}: ${story.substring(0, 50)}...`);
        missing++;
    }
});

console.log(`Missing translations: ${missing}`);
