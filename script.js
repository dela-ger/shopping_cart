const removeButton = document.querySelectorAll(".btn-danger");
const quantityInput = document.querySelectorAll(".cart-quantity-input");
const addToCartBtn = document.querySelectorAll(".shop-item-button");

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    removeButton.forEach( (button) => {
        button.addEventListener('click', removeClick);
    })

    quantityInput.forEach((input) => {
        input.addEventListener('change', quantityChange);
    })

    addToCartBtn.forEach((add) => {
        add.addEventListener('click', addToCartClicked)
    })
}

//function to add item to the cart
function addToCartClicked (event) {
    const button = event.target;

    const shopItem = button.parentElement.parentElement;
    const title = shopItem.querySelectorAll('.shop-item-title')[0].innerText;
    const price = shopItem.querySelectorAll('.shop-item-price')[0].innerText;
    const image = shopItem.querySelectorAll('.shop-item-image')[0].src;
    addItemToCart(title, price, image)
    updateTotal()
}  

//function to add the items to the DOM
function addItemToCart(title, price, image) {
    const cartItems = document.querySelector('.cart-items');
    
    const cartRow = document.createElement("div");

    const cartTitle = cartItems.querySelectorAll('.cart-item-title');
    for ( let i=0; i < cartTitle.length; i++){
        if (cartTitle[i].innerText == title){
            alert (`this has already been added`)
            return
        }
    }
    cartRow.classList.add('cart-row')
    cartRow.innerHTML =`
    <div class="cart-item cart-column">
    <img src="${image}"
     alt="" class="cart-item-image" width="100" height="100">
     <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input type="number" class="cart-quantity-input" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click',
    removeClick)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change',
    quantityChange)
    
}

//function to remove item from the cart
function removeClick (event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
}

// function to change the value of the quantity of item
function quantityChange (event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateTotal();
}

//function to update the total cost of items
function updateTotal() {
    const cartTotalPrice = document.querySelector('.cart-total-price')
    const cartItems = document.querySelectorAll('.cart-items')[0]
    const cartRow = cartItems.querySelectorAll('.cart-row');
    let total = 0

    cartRow.forEach((row) => {
        //let total = 0
        const cartPrice = row.querySelectorAll('.cart-price')[0]
        const price = parseFloat(cartPrice.innerText.replace('Ghc', ''));
        const cartQuantity = row.querySelectorAll('.cart-quantity-input')[0];
        const quantity = cartQuantity.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100;
        cartTotalPrice.innerText = `Ghc${total}`;    
    })
    
}

// function totalZero () {
//     const cartItems = document.querySelector('.cart-items');
//     if (cartItems.textContent.trim() === '') {
//         console.log('empty div')
//     }
// }