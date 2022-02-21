const fs = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const solutions = fs.readFileSync(appDir + '/../src/static/solutionWords.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
})
.replace(/"/g, '')
.replace(/,/g, '')
.split('\n');

fs.writeFileSync(appDir + '/../src/static/solutionWordsCompiled.json', JSON.stringify(solutions), (err) => {
  if (err) console.log(err);
});

let allowed = fs.readFileSync(appDir + '/../src/static/allowedWords.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
})
.replace(/"/g, '')
.replace(/,/g, '')
.split('\n');

const placeAtIndex = (word, index) => {
  let placement = word > allowed[index] ? index + 1 : index;
  let lastHalf = allowed.slice(placement, allowed.length);
  allowed = allowed.slice(0, placement).concat([word]).concat(lastHalf);
}

const place = (word, min, max) => {
  let middle = Math.floor((min + max) / 2);

  if (allowed[middle] === 'word') {
    return;
  }

  if (max - min <= 0) {
    placeAtIndex(word, middle);
    return;
  }

  return word > allowed[middle] ? place(word, middle + 1, max) : place(word, min, middle - 1);
}

solutions.forEach(word => place(word, 0, allowed.length - 1));

fs.writeFileSync(appDir + '/../src/static/allowedWordsCompiled.json', JSON.stringify(allowed), (err) => {
  if (err) console.log(err);
});

