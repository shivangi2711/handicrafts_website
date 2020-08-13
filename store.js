// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded'.ready)
// } else {
//     ready()
// }

// function ready() {
//     var cartItemContainer1 = document.getElementsByClassName('cart-items')[0]
//     var cartRows1 = cartItemContainer1.getElementsByClassName('cart-row')

//     var tot = 0
//     for (var i = 0; i < cartRows1.length; i++) {
//         var cartRow1 = cartRows1[i]
//         var priceElement1 = cartRow1.getElementsByClassName('p-price')[0]
//         var quantityElement1 = cartRow1.getElementsByClassName('cart-quantity-input')[0]
//         var price1 = parseFloat(priceElement1.innerText.replace('₹', ''))
//         var quantity1 = quantityElement1.value
//         tot = tot + (price1 * quantity1)
//     }
//     tot = Math.round(tot * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + tot


//     var removeCartItemButtons = document.getElementsByClassName("remove-item")
//     console.log(removeCartItemButtons)
//     for (var i = 0; i < removeCartItemButtons.length; i++) {
//         var button = removeCartItemButtons[i]
//         button.addEventListener('click', removeCartItem)
//     }
//     var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i]
//         input.addEventListener('change', quantityChanged)
//     }
// }

// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }

// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }

// console.log(localStorage.getItem('Title').value)

// function updateCartTotal() {
//     console.log("update func")
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     console.log(cartRows)
//     var total = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('p-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         console.log('before')
//         console.log(priceElement, quantityElement)
//         console.log('after')
//         var price = parseFloat(priceElement.innerText.replace('₹', ''))
//         var quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total
// }







if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}
function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-remove")
    console.log(removeCartItemButtons)
//console.log(removeCartItemButtons);
for(var i=0; i<removeCartItemButtons.length ;i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i=0; i<quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for(var i=0;i<addToCartButtons.length;i++){
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}

}

    function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
        
    }

    function quantityChanged(event){
var input = event.target
if(isNaN(input.value) || input.value<=0 ){
    input.value=1
}
updateCartTotal()
    }

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = document.getElementsByClassName('shop-item-title')[0].innerText
    var price = document.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = document.getElementsByClassName('shop-item-image')[0].src 
  
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemNames.length ;i++){
if(cartItemNames[i].innerText== title){
    alert("This item has already been added to the cart.")
    return
}
    }
    var cartRowContents = `    
          <span class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-title">${title}</span>
          </span>
          <span class="cart-price cart-column">${price}</span>
          <span class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-warning btn-remove" type="button">Remove</button>
          </span>
        `
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows =cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
for(var i=0;i<cartRows.length;i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('₹', ''))
   var quantity = quantityElement.value
   total = total + (price*quantity)   
}
total=Math.round(total*100)/100
document.getElementsByClassName('cart-total-price')[0].innerText = '₹'+total
}