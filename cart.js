let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty">
                <h2>Your cart is empty 🛒</h2>
                <br>
                <a href="index.html" class="btn">Continue Shopping</a>
            </div>
        `;

        total.innerHTML = "Total : ₹0";
        return;
    }

    let grandTotal = 0;

    cart.forEach(item => {

        grandTotal += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-left">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h2>${item.name}</h2>

                    <p>₹${item.price}</p>

                    <p>Quantity : ${item.quantity}</p>

                </div>

            </div>

            <div class="cart-right">

                <button class="qty-btn"
                onclick="increase(${item.id})">
                +
                </button>

                <button class="qty-btn"
                onclick="decrease(${item.id})">
                -
                </button>

                <br>

                <button class="remove-btn"
                onclick="removeItem(${item.id})">
                Remove
                </button>

            </div>

        </div>

        `;

    });

    total.innerHTML = `Total : ₹${grandTotal}`;

}

// Increase Quantity
function increase(id){

    const item = cart.find(product => product.id === id);

    item.quantity++;

    saveCart();

}

// Decrease Quantity
function decrease(id){

    const item = cart.find(product => product.id === id);

    if(item.quantity > 1){

        item.quantity--;

    }else{

        removeItem(id);

        return;

    }

    saveCart();

}

// Remove Product
function removeItem(id){

    cart = cart.filter(product => product.id !== id);

    saveCart();

}

// Save Cart
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

// Checkout
function checkout(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "payment.html";

}

// Initial Load
displayCart();