// Render Product
let productsEl = document.querySelector('.product-grid');
let cartItemsEl = document.querySelector('.cart-items');
let subTotalItemsEl = document.querySelector('.cart-total-price');
let totalItemsInCartEl = document.querySelector('.total-items-in-cart');

function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
       <div class="product-grid">
          <div class="card stacked">
            <img src=${product.img} alt="" class="card_img" />
            <div class="card-content">
              <h2 class="card_title">${product.title}</h2>
              <p class="card_price">$${product.price}</p>
              <div class="size">
                <h3>Size :</h3>
                <span>${product.size[0]}</span>
                <span>${product.size[1]}</span>
                <span>${product.size[2]}</span>
                <span>${product.size[3]}</span>
                <span>${product.size[4]}</span>
              </div>
              <button class="btn shopping-cart-btn" onclick="addToCart(${product.id})">Add To Cart</button>
            </div>
          </div>
    `;
  });
}
renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();

// Add to cart function
function addToCart(id) {
  // Check if product exist
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits('plus', id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      itemQuantity: 1,
    });
  }
  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save to local storage
  localStorage.setItem('CART', JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.itemQuantity;
    totalItems += item.itemQuantity;
  });
  subTotalItemsEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart item
function renderCartItems() {
  cartItemsEl.innerHTML = ''; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-row">
        <div class="cart-item cart-column">
          <img
              class="cart-item-image card_img"
              src=${item.img}
              width="100"
              height="100"
          />
          <span class="cart-item-title">${item.title}</span>
        </div>
          <span class="cart-price cart-column">$${item.price}</span>
        <div class="unit">
          <div class="btn minus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
          <div class="number">${item.itemQuantity}</div>
          <div class="btn plus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
        </div>
         <button onclick="removeItem(${item.id})" class="btn-danger cart-column" type="button">REMOVE</button>
      </div>
    `;
  });
}

// change number of units for an items
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.itemQuantity;
    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === 'plus') {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      itemQuantity: numberOfUnits,
    };
  });
  updateCart();
}

// Remove Product
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// let removeItem = document.querySelectorAll('.btn-danger').forEach((button) => {
//   button.addEventListener('click', (e) => {
//     e.target.parentElement.parentElement.remove();
//   });
// });
