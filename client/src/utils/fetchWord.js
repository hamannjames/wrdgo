export default function fetchWord () {
  return fetch('/word')
    .then(res => res.text())
    .then(data => {
      return data;
    })
    .catch(e => {
      console.log(e);
    })
}