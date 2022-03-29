const headingText = "Products in your shopping cart";
const shoppingCart = document.querySelector(".shopping-cart");

const products = document.querySelectorAll(".product-name");
const prices = document.querySelectorAll(".price");
const buttons = document.querySelectorAll(".add-cart");

const productItems = [
  {
    productName: products[0].textContent,
    price: prices[0].textContent.substring(1),
    inCart: 0,
  },
  {
    productName: products[1].textContent,
    price: prices[1].textContent.substring(1),
    inCart: 0,
  },
  {
    productName: products[2].textContent,
    price: prices[2].textContent.substring(1),
    inCart: 0,
  },
];
console.log;
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    cartCounter(productItems[i]);
    totalCost(productItems[i]);
    displayCart();
  });
}

// counting the cart items and storing values in the local storage
const cartCounter = (product) => {
  let cartCount = localStorage.getItem("cartCounter");
  cartCount = parseInt(cartCount);
  if (cartCount) {
    localStorage.setItem("cartCounter", cartCount + 1);
  } else {
    localStorage.setItem("cartCounter", 1);
  }
  setItems(product);
};

const setItems = (product) => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.productName] == undefined) {
      cartItems = {
        ...cartItems,
        [product.productName]: product,
      };
    }
    cartItems[product.productName].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.productName]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

const totalCost = (product) => {
  let cartCost = localStorage.getItem("totalCost");
  let productPrice = product.price;
  productPrice = parseFloat(productPrice);

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", (cartCost + productPrice).toFixed(2));
  } else {
    localStorage.setItem("totalCost", productPrice);
  }
};

const displayCart = () => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  shoppingCart.innerHTML = `<h4 class="my-4">No products in your shopping cart</h4> `;
  if (cartItems) {
    shoppingCart.innerHTML = `
        <h4 class="my-4">Products in your shopping cart</h4>
        <div class="row title-row">
            <div class="col-lg-6 col-4">
                <h6>Product</h6>
            </div>
            <div class="col-lg-3 col-4">
                <h6>Quantity</h6>
            </div>
            <div class="col-lg-3 d-flex justify-content-end col-4">
                <h6>Value</h6>
            </div>
        </div>
        <hr class="products-hr" />
        
    `;
    Object.values(cartItems).map((item) => {
      shoppingCart.innerHTML += ` 
      <div class="row d-flex align-items-center">                       
        <div class="col-lg-6 col-5">
            <h6>
            <strong>
                ${item.productName}
            </strong>
            <g>
                <svg width="20px" height="20px" viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info">
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span class="pop-up"><span class="arrow-left"></span>This is a short description
                    about this
                    awesome product that appear only on
                    hover.
                </span>
            </g>
            </h6>
        </div>
        <div class="col-lg-3 col-3">
            <div class="form-group w-75">
                <input type="text" class="form-control" value="${item.inCart}">
            </div>
        </div>
            <div class="col-lg-3 col-4 d-flex justify-content-end">
                <h6><strong>$${item.inCart * item.price}</strong></h6>
            </div>
        </div>   
    `;
    });
    shoppingCart.innerHTML += `
    <hr class="total-hr" />
    <div class="d-flex align-self-end">
        <h6><strong>Total: $${cartCost}</strong></h6>
    </div>
    <button class="btn mb-4 mt-3 py-2">Continue</button>
    `;
  }
};
displayCart();

const content = `<h4 class="my-4">No products in your shopping cart</h4>
<div class="row ">
    <div class="col-lg-6">
        <h6>Product</h6>
    </div>
    <div class="col-lg-3">
        <h6>Quantity</h6>
    </div>
    <div class="col-lg-3 d-flex justify-content-end">
        <h6>Value</h6>
    </div>
</div>
<hr class="products-hr" />
<div class="row d-flex align-items-center">
    <div class="col-lg-6">
        <h6>
            <strong>
                Product number 1
            </strong>
            <g>
                <svg width="20px" height="20px" viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info">
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span class="pop-up"><span class="arrow-left"></span>This is a short description
                    about this
                    awesome product that appear only on
                    hover.
                </span>
            </g>
        </h6>
    </div>
    <div class="col-lg-3">
        <div class="form-group w-75">
            <input type="text" class="form-control" placeholder="1">
        </div>
    </div>
    <div class="col-lg-3 d-flex justify-content-end">
        <h6><strong>$120.00</strong></h6>
    </div>
</div>
<hr class="total-hr" />
<div class="d-flex align-self-end">
    <h6><strong>Total: $120.00</strong></h6>
</div>
<button class="btn mb-4 mt-3 py-2">Continue</button>`;

// const addCartItem = (buttons[0].onclick = () => {
//   shoppingCart.innerHTML = content;
// });
