const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.send();
// backend can respond in json, html, text, image etc.
//using a browser is like using a getting a response form GET request