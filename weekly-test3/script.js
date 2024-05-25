const productsList = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const productContainer = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const totalPriceElement = document.getElementById('total-price');

let cart = {};

function renderProducts() {
    productsList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productInfo = document.createElement('span');
        productInfo.textContent = `${product.name} - ${product.price}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => addToCart(product));
        
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = cart[product.id] || 0;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => removeFromCart(product, quantitySpan));
        
        productDiv.appendChild(productInfo);
        productDiv.appendChild(removeButton);
        productDiv.appendChild(quantitySpan);
        productDiv.appendChild(addButton);
        
        productContainer.appendChild(productDiv);
    });
}

function addToCart(product) {
    if (!cart[product.id]) {
        cart[product.id] = 0;
    }
    cart[product.id]++;
    renderCart();
    updateProductQuantity(product);
}

function removeFromCart(product, quantitySpan) {
    if (cart[product.id]) {
        cart[product.id]--;
        if (cart[product.id] === 0) {
            delete cart[product.id];
        }
        renderCart();
        updateProductQuantity(product);
    }
}

function updateProductQuantity(product) {
    const productDivs = document.querySelectorAll('.product');
    productDivs.forEach(productDiv => {
        if (productDiv.firstChild.textContent.startsWith(product.name)) {
            productDiv.children[2].textContent = cart[product.id] || 0;
        }
    });
}

function renderCart() {
    cartContainer.innerHTML = '';
    const cartItems = Object.keys(cart);
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItems.forEach(productId => {
            const product = productsList.find(product => product.id == productId);
            const cartProductDiv = document.createElement('div');
            cartProductDiv.classList.add('cart-product');
            cartProductDiv.textContent = `${product.name} - ${cart[productId]} x ${product.price} = ${cart[productId] * product.price}`;
            cartContainer.appendChild(cartProductDiv);
        });
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = Object.keys(cart).reduce((total, productId) => {
        const product = productsList.find(product => product.id == productId);
        return total + (cart[productId] * product.price);
    }, 0);
    totalPriceElement.textContent = totalPrice;
}

renderProducts();
