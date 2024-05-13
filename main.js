let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('active')
};

window.onscroll = () => {
    menu.classList.remove('bx-x')
    navbar.classList.remove('active')
};

// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#cart-close");
  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

class handle_changeItemQuantity {
  constructor() {
    if (isNaN(this.value) || this.value < 1) {
      this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer

    update();
  }
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];

  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("₱", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "₱" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

//alternate functionality add to cart
const addToCartButtons = document.querySelectorAll('.add-cart');

// Adding click event listeners to all "add to cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to add product to cart
function addToCart(event) {
  // Getting the clicked button
  const button = event.target;
  // Selecting the product box containing the clicked button
  const productBox = button.parentElement;
  // Getting product information
  const productImg = productBox.querySelector('.product-img').src;
  const productTitle = productBox.querySelector('.product-title').textContent;
  const productPrice = productBox.querySelector('.product-price').textContent;

  // Check if the product is already in the cart
  const cartItems = document.querySelectorAll('.cart-product-title');
  for (const cartItem of cartItems) {
      if (cartItem.textContent === productTitle) {
          alert('This item is already in your cart!');
          return; // Stop execution if the item is already in the cart
      }
    }
  }

  //===============Alternate Code =========

 // Function to add product to cart
function addToCart(event) {
  
  const button = event.target;

  const productBox = button.parentElement;
 
  const productImg = productBox.querySelector('.product-img').src;
  const productTitle = productBox.querySelector('.product-title').textContent;
  const productPrice = parseFloat(productBox.querySelector('.product-price').textContent.replace('₱', ''));


  const cartItems = document.querySelectorAll('.cart-product-title');
  for (const cartItem of cartItems) {
      if (cartItem.textContent === productTitle) {
          alert('This item is already in your cart!');
          return; 
      }
  }


  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-box');
  cartItem.innerHTML = `
      <img src="${productImg}" alt="Product Image" class="cart-img">
      <div class="detail-box">
          <h3 class="cart-product-title">${productTitle}</h3>
          <span class="cart-price">${productPrice}</span>
      </div>
      <input class="cart-quantity" type="number" value="1">
      <button class="remove-btn">Remove</button>
  `;

  const cartContainer = document.querySelector('.class-content');
  cartContainer.appendChild(cartItem);

 
  const removeButton = cartItem.querySelector('.remove-btn');
  removeButton.addEventListener('click', removeCartItem);


  const quantityInput = cartItem.querySelector('.cart-quantity');
  quantityInput.addEventListener('change', updateCartItemTotal);

 
  updateTotalPrice();
}


function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove(); 
  updateTotalPrice(); 
}


function updateTotalPrice() {
  const cartItems = document.querySelectorAll('.cart-box');
  let totalPrice = 0;
  cartItems.forEach(cartItem => {
      const price = parseFloat(cartItem.querySelector('.cart-price').textContent);
      const quantity = cartItem.querySelector('.cart-quantity').value;
      totalPrice += price * quantity;
  });
  document.querySelector('.total-price').textContent = `Total: ₱${totalPrice.toFixed(2)}`;
}


function updateCartItemTotal(event) {
  const input = event.target;
  const cartItem = input.parentElement;
  const price = parseFloat(cartItem.querySelector('.cart-price').textContent);
  const quantity = parseInt(input.value);
  const itemTotalPrice = price * quantity;
  cartItem.querySelector('.cart-price').textContent = itemTotalPrice.toFixed(2);
  updateTotalPrice();
}



