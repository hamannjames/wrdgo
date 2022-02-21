import words from '../static/solutionWordsCompiled.json';

export default function getSolution () {

  const epoch = new Date(2021, 5, 19);
  const offset = Math.floor(((new Date()) - epoch) / (1000 * 60 * 60 * 24));
  const word = words[offset];

  return word; 
}