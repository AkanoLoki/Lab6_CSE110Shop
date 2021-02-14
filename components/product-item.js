// product-item.js

class ProductItem extends HTMLElement {
  // Constructor
  constructor(arr) {
    // check input
    if (arr == null) {
      throw 'Invalid input in element creation'
    }
    // Call super
    super()
    // Assign
    this.prop = arr
  }

  // Convert to html element
  toHTMLElement() {
    // Construct sample product wrapper    
    const outerLi = document.createElement("li")
    outerLi.setAttribute("class","product")
    outerLi.setAttribute("id",this.prop.id)

    //construct image element
    const img = document.createElement("img")
    img.setAttribute("src",this.prop.image)
    img.setAttribute("alt",this.prop.title)
    img.setAttribute("width",200)

    // construct title element
    const title = document.createElement("p")
    title.setAttribute("class","title")
    title.appendChild(document.createTextNode(this.prop.title))

    // construct price element
    const price = document.createElement("p")
    price.setAttribute("class","price")
    price.appendChild(document.createTextNode("$"+this.prop.price))

    // description is not mentioned so it will not be handled

    // construct add to cart button element.
    // Note that the add to cart functionality will be handled by script.js
    const cartBtn = document.createElement("button")
    cartBtn.setAttribute("id","btn"+this.prop.id)
    cartBtn.appendChild(document.createTextNode("Add to Cart"))

    // node cascading
    outerLi.appendChild(img)
    outerLi.appendChild(title)
    outerLi.appendChild(price)
    outerLi.appendChild(cartBtn)
    return outerLi;
  }
}

customElements.define('product-item', ProductItem)
