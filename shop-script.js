window.addEventListener("scroll", function(){
    var navbar = document.querySelector(".nav-bar");
    navbar.classList.toggle("onScroll", window.scrollY > 0);
})

const navLinks = document.querySelectorAll('.nav-item');
const userLink = document.querySelector('#user a');
const use = document.getElementById('user-tag');
const currentPage = window.location.href;
navLinks.forEach(navLink => {
    if(navLink.href === currentPage){
        navLink.classList.add('active');
    }
    
});

if(userLink.href === currentPage){
    userLink.classList.add('userActive');
}

document.addEventListener("DOMContentLoaded", function() {
    displayProducts();
});

const products = [
   { id: 0, image: 'images/shop images/img-1.jpg', title: '8-Piece Wooden Spoons', price: 10.99 },
   { id: 1, image: 'images/shop images/img-2.jpg', title: 'Solar Lantern', price: 65.00 },
   { id: 2, image: 'images/shop images/img-3.webp', title: 'Wooden Mortar', price: 13.99 },
   { id: 3, image: 'images/shop images/img-4.jpg', title: 'Paper Lunch Box', price: 0.99 },
   { id: 4, image: 'images/shop images/img-5.webp', title: '6-Piece Wooden Spoons', price: 8.99 },
   { id: 5, image: 'images/shop images/img-6.jpg', title: '125-Piece Paper Plate Pack', price: 1.50 },
   { id: 6, image: 'images/shop images/img-7.jpg', title: 'Bamboo Water Bottle', price: 15.99 },
   { id: 7, image: 'images/shop images/img-8.webp', title: 'Recycling Bag', price: 0.99 },
   { id: 8, image: 'images/shop images/img-9.jpg', title: 'Paper Straw 100 pieces', price: 3.65 },
   { id: 9, image: 'images/shop images/img-10.webp', title: 'Wooden Spoons', price: 0.10 },
   { id: 10, image: 'images/shop images/img-11.webp', title: 'Paper Lunch box', price: 1.50 },
   { id: 11, image: 'images/shop images/img-12.webp', title: 'Wooden Bowl Set', price: 5.00 },
   { id: 12, image: 'images/shop images/img-13.jpg', title: 'Recycling Bags', price: 0.50 },
   { id: 13, image: 'images/shop images/img-19.webp', title: 'Solar Table lamp', price: 8.99 },
   { id: 14, image: 'images/shop images/img-14.jpg', title: 'Wodden Hangers', price: 1.00 },
   { id: 15, image: 'images/shop images/img-17.jpg', title: 'Paper cups', price: 0.10 },
];

let cart = [];

function displayProducts() {
   document.querySelector('.item-holder').innerHTML = products.map((product, index) => {
       return `
           <div class="item-box">
               <div class="discount">${product.id % 2 === 0 ? '-10%' : 'New'}</div>
               <div class="image">
                   <img src="${product.image}" alt="${product.title}">
                   <div class="icons">
                       <a href="#" class="add-to-cart" onclick="addToCart(${index})"><i class="fa-solid fa-cart-shopping"></i>add to cart</a>
                   </div>
               </div>
               <h3>${product.title}</h3>
               <div class="price">
                   <span class="new-price">$${product.price.toFixed(2)}</span>
                   <span class="old-price">$${(product.price * 1.2).toFixed(2)}</span>
               </div>
           </div>
       `;
   }).join('');
}

function addToCart(index) {
   const existingProduct = cart.find(item => item.id === products[index].id);
   if (existingProduct) {
       existingProduct.qnt += 1;
   } else {
       cart.push({ ...products[index], qnt: 1 });
   }
   displayCart();
}

function deleteCartItem(index) {
   cart[index].qnt -= 1;
   if (cart[index].qnt === 0) {
       cart.splice(index, 1);
   }
   displayCart();
}

function displayCart() {
   let total = 0;
   let totalItems = 0;
   document.getElementById("count").innerHTML = cart.length;
   if (cart.length === 0) {
       document.getElementById('cartItem').innerHTML = "Your cart is empty";
       document.getElementById("total").innerHTML = "$ 0.00";
   } else {
       document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
           total += item.price * item.qnt;
           totalItems += item.qnt;
           return `
               <div class='cart-item'>
                   <div class='row-img'>
                       <img class='rowimg' src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='images/placeholder.jpg';">
                   </div>
                   <p style='font-size:12px; color:black'>${item.title}</p>
                   <p style='font-size:12px;color:black'>Quantity: ${item.qnt}</p>
                   <h2 id="final-price"; style='font-size: 15px;'>$${(item.price * item.qnt).toFixed(2)}</h2>
                   <i class='fa-solid fa-trash' onclick='deleteCartItem(${index})'></i>
               </div>
           `;
       }).join('');
       document.getElementById("total").innerHTML = "$" + total.toFixed(2);
   }
}

function showPayment(){
    var paymentSection = document.getElementById("payment");
    paymentSection.classList.toggle("hidden")
}
