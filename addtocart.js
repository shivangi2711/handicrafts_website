// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded'.ready)
// } else {
//     ready()
// }
// function ready(event){
//     var addToCartButtons = document.getElementsByClassName('shop-item-button')
// for(var i=0; i<addToCartButtons.length; i++){
//     var button = addToCartButtons[i]
//     button.addEventListener('click', addToCartClicked)
// }
// }

// function addToCartClicked(event){
//     var button = event.target
//     var shopItem = button.parentElement.parentElement
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//     console.log(title,price,imageSrc)
//     var Title = localStorage.setItem('Title',title)
//     var Price = localStorage.setItem('Price',price)
//     var imageSrc = localStorage.setItem('ImageSrc', imageSrc)

//     // addItemToCart(title,price,imageSrc)
// }

// function addItemToCart(title,price,imageSrc){
// var cartRow = document.createElement('tr')
// cartRow.innerText = title
// var cartItems = document.getElementsByClassName('cart-items')[0]
// console.log(cartItems)
// cartItems.append(cartRow)
// }