// Script.js
const dataKey = 'fetched'
const cartKey = 'cart'

// utility function that handles an add-to-cart button click
function onCartBtnClicked(id) {
  // NOTE THAT ID STARTS AT 1
  if (typeof id !== 'number') {
    id = parseInt(id)
  }
  // conversion to 0-based
  const cartListId = id - 1
  // parse stored cart
  const cl = window.localStorage.getItem(cartKey).split(',')
  // Check if already in cart
  if (cl[cartListId]=="true") {
    // in cart, click to remove
    cl[cartListId] = "false"
    // update count
    document.getElementById('cart-count').innerHTML =
      parseInt(document.getElementById('cart-count').innerHTML) - 1
    // change button text
    document.getElementById("btn"+id).innerHTML = 'Add to Cart'
  } else {
    // not in cart
    // modify local cart
    cl[cartListId] = "true"
    // update count
    document.getElementById('cart-count').innerHTML =
      parseInt(document.getElementById('cart-count').innerHTML) + 1
    // change button text
    document.getElementById("btn"+id).innerHTML = 'Remove from Cart'
  }
  // Store local cart
  window.localStorage.setItem(cartKey, cl.toString())
}

const onCartBtnClick = function () {
  onCartBtnClicked(this.parentElement.id)
}

window.addEventListener('DOMContentLoaded', () => {
  // fetch from remote
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((fetchedData) => {
      // response type check
      if (window.localStorage.getItem(dataKey) == null) {
        // store only if not in storage already
        window.localStorage.setItem(dataKey, JSON.stringify(fetchedData))
      } else {
        // do nothing
      }
    })
  // data fetch finished

  // JSON parse
  const prodJsonArr = JSON.parse(window.localStorage.getItem(dataKey))
  const prodList = []
  let cartList = []
  let itemCount = 0
  // iterative item creation
  for (subArr of prodJsonArr) {
    // Item creation
    let elem = new ProductItem(subArr)
    prodList.push(elem)
    // tally
    cartList.push(false)
    itemCount++
  }

  // cart storage check
  if (
    window.localStorage.getItem(cartKey) == null ||
    window.localStorage.getItem(cartKey).split(',').length !== prodList.length
  ) {
    // initialize an empty list with length of elem.
    window.localStorage.setItem(cartKey, cartList.toString())
  } else {
    // parse stored cart list
    cartList = window.localStorage.getItem(cartKey)
    cartList = cartList.split(',')
  }

  // HTML insertion
  for (prod of prodList) {
    // Pre insertion
    const elem = prod.toHTMLElement()
    //Init add to cart action
    elem.getElementsByTagName('button')[0].onclick = onCartBtnClick
    //check cart status
    const cartListId = parseInt(elem.id) - 1
    if (cartList[cartListId]=="true") {
      // In cart
      // update count
      document.getElementById('cart-count').innerHTML =
        parseInt(document.getElementById('cart-count').innerHTML) + 1
      // change button text
      elem.getElementsByTagName('button')[0].innerHTML = 'Remove from Cart'
    }
    // Pre insertion complete
    // Insert current item
    document.getElementById('product-list').appendChild(elem)
  }
})
