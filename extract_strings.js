import fs from 'fs';
import path from 'path';

const gradesDir = 'c:/Users/Cubic/Downloads/Math-kids.buld.new/web-app/src/mate/data/grades';
const files = fs.readdirSync(gradesDir).filter(f => f.endsWith('.ts'));

const strings = new Set();

// Special case for Grade 1 folder
const grade1Dir = path.join(gradesDir, 'grade1');
const allGradeFiles = [];

if (fs.existsSync(grade1Dir)) {
    const g1Files = fs.readdirSync(grade1Dir).filter(f => f.endsWith('.ts'));
    g1Files.forEach(file => {
        allGradeFiles.push(path.join(grade1Dir, file));
    });
}

files.forEach(file => {
    allGradeFiles.push(path.join(gradesDir, file));
});

allGradeFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Regex for both single and double quotes
    const matches = content.match(/['"`](.*?)['"`]/g);
    matches?.forEach(m => {
        const s = m.slice(1, -1);
        if (/[а-яА-Я]/.test(s)) strings.add(s);
    });
});

console.log(JSON.stringify(Array.from(strings), null, 2));
