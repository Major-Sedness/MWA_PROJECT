const items = document.querySelectorAll('div');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

function displayCart() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

    nameCell.innerText = item.name;
    priceCell.innerText = `$${item.price}`;

    row.appendChild(nameCell);
    row.appendChild(priceCell);

    cartItems.appendChild(row);
  });

  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0).toFixed(2);

  cartTotal.innerText = `$${total}`;
}

function addToCart(id, name, price) {
  cart.push({
    id,
    name,
    price
  });

  localStorage.setItem('cart', JSON.stringify(cart));

  displayCart();
}

items.forEach(item => {
  const button = item.querySelector('button');

  button.addEventListener('click', () => {
    const id = item.getAttribute('data-id');
    const name = item.getAttribute('data-name');
    const price = item.getAttribute('data-price');

    addToCart(id, name, price);

   alert(`${name} added to cart`);
  });
});

window.addEventListener('load', () => {
  const storedCart = localStorage.getItem('cart');

  if (storedCart) {
    cart = JSON.parse(storedCart);
    displayCart();
  }
});