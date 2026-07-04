let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price * item.quantity;
});

document.getElementById("totalAmount").innerHTML =
`Total : ₹${total}`;

document.getElementById("paymentForm").addEventListener("submit", function(e){

    e.preventDefault();

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    const order = {

        orderId: "SM" + Math.floor(Math.random()*1000000),

        total: total,

        date: new Date().toLocaleString()

    };

    localStorage.setItem("order",JSON.stringify(order));

    localStorage.removeItem("cart");

    alert("Payment Successful ✅");

    window.location.href="receipt.html";

});