// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // initialize local storage
  const strg = window.localStorage;
  const arrayKey = "fetched"; // arbitrary array key name.

  // fetch from remote 
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(fetchedData => {
    // response type check
    if(strg.getItem(arrayKey) == null){
      // store only if not in storage already
      strg.setItem(arrayKey, JSON.stringify(fetchedData));
    }else{
      // do nothing
    }});
// data fetch finished


//JSON parse and item creation

});