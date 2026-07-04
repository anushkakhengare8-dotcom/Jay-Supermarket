const products = [
    {
        id: 1,
        name: "Fresh Apples",
        price: 120,
        category: "Fruits",
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400"
    },
    {
        id: 2,
        name: "Bananas",
        price: 60,
        category: "Fruits",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400"
    },
    {
        id: 3,
        name: "Tomatoes",
        price: 40,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
    },
    {
        id: 4,
        name: "Potatoes",
        price: 35,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
    },
    {
        id: 5,
        name: "Milk",
        price: 65,
        category: "Dairy",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"
    },
    {
        id: 6,
        name: "Cheese",
        price: 180,
        category: "Dairy",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"
    },
    {
        id: 7,
        name: "Potato Chips",
        price: 30,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400"
    },
    {
        id: 8,
        name: "Cookies",
        price: 90,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400"
    }
];

// ==========================
// Cart
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// Display Products
// ==========================

function displayProducts(productList) {

    const container = document.getElementById("product-container");

    container.innerHTML = "";

    productList.forEach(product => {

        container.innerHTML += `

        <div class="product">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price}</p>

                <button class="add-cart"
                onclick="addToCart(${product.id})">
                Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}

// ==========================
// Add to Cart
// ==========================

function addToCart(id){

    const product = products.find(item => item.id === id);

    const exist = cart.find(item => item.id === id);

    if(exist){

        exist.quantity++;

    }else{

        cart.push({

            ...product,
            quantity:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");

}

// ==========================
// Cart Count
// ==========================

function updateCartCount(){

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    document.getElementById("cart-count").innerText = totalItems;

}

updateCartCount();

// ==========================
// Search
// ==========================

const search = document.getElementById("search");

search.addEventListener("keyup",function(){

    const text = this.value.toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(text)

    );

    displayProducts(filtered);

});

// ==========================
// Category Filter
// ==========================

const buttons = document.querySelectorAll(".category-btn");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const category = button.dataset.category;

        if(category==="All"){

            displayProducts(products);

        }else{

            const filtered = products.filter(product=>product.category===category);

            displayProducts(filtered);

        }

    });

});

// ==========================
// Initial Load
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
    updateCartCount();
});