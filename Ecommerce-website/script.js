// Function to open the order form popup
function openOrderForm() {
  document.getElementById('orderForm').style.display = 'flex';
}

// Function to close the order form popup
function closeOrderForm() {
  document.getElementById('orderForm').style.display = 'none';
}

// Cart array to hold the products
let cart = [];

// Check if there are cart items saved in localStorage, and load them
if (localStorage.getItem('cart')) {
  try {
    const stored = JSON.parse(localStorage.getItem('cart'));
    cart = Array.isArray(stored) ? stored : [];
  } catch {
    cart = [];
  }
}

// Function to add product to the cart
function addToCart(productName, productPrice) {
  const product = { name: productName, price: productPrice };
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));  // Save to localStorage
  updateCartCount();
}

// Function to update cart item count in navbar
function updateCartCount() {
  const cartCount = cart.length;
  const cartCountSpan = document.getElementById('cartItemCount');
  if (cartCountSpan) {
    cartCountSpan.textContent = cartCount;
  }
}

// Function to display cart items on the cart page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountContainer = document.getElementById('total-amount');
  let totalAmount = 0;

  cartItemsContainer.innerHTML = ''; // Clear previous items

  cart.forEach((product, index) => {
    totalAmount += product.price;

    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');
    productElement.innerHTML = `
      <p>${product.name}</p>
      <p>₹${product.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(productElement);
  });

  totalAmountContainer.textContent = totalAmount;
}

// Function to remove product from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Function to proceed to checkout (could redirect to a checkout page)
function checkout() {
  alert('Proceeding to checkout!');
  window.location.href = "checkout.html";
}

// Display cart items on cart page load
if (document.getElementById('cart-items')) {
  displayCartItems();
}

// Update cart count when page loads
window.onload = updateCartCount;

// ✅ Updated: Handle checkout and clear cart globally
function handleCheckout(event) {
  event.preventDefault(); // Prevent default form submission

  if (confirm('Are you sure you want to place the order?')) {
    alert('🎉 Your order has been placed successfully! Thank you for shopping with ShopEase.');

    // Clear cart from memory and localStorage
    cart = [];
    localStorage.removeItem('cart');

    // Reset cart count in navbar
    const cartCountSpan = document.getElementById('cartItemCount');
    if (cartCountSpan) {
      cartCountSpan.textContent = "0";
    }

    // Clear cart UI if on cart.html
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    if (cartItems) cartItems.innerHTML = '';
    if (totalAmount) totalAmount.textContent = '0';

 // ✅ Redirect to home page after order placement
    setTimeout(() => {
      window.location.href = "index.html"; // Change this if your homepage has a different filename
    }, 1000); // 1 second delay for smoother transition
  }
}
