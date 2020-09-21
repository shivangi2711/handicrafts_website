let carts = document.querySelectorAll(".add-cart");



let products = [
    {
        name: 'Pot',
        tag: 1,
        price: 160,
        inCart: 0
    },
    {
        name: 'Plate',
        tag: 2,
        price: 260,
        inCart: 0
    },
    {
        name: 'Mug',
        tag: 3,
        price: 560,
        inCart: 0
    }

]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        //removeCartItem(products[i]);
        // updateCartTotal(products[i]);
    })
}



function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.mr-right .nav-item span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.mr-right .nav-item span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.mr-right .nav-item span').textContent = 1;

    }

    setItems(product);
}

function setItems(product) {

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log(product.price);

    let cartCost = localStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector('.products-container');
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
           <div class="row cartRow" > 
           <div class= "product row">
               <button id="trash" class="fa fa-trash" itemTag="${item.tag}"></button>
               <img width=50% height=100% src = "./image/edited/blue pottery/${item.tag}.jpg">
               <span>${item.name}</span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="price">₹${item.price}.00</div>
            <div class="quantity">
                <button id="minus" class="fa fa-chevron-circle-left" itemTag="${item.tag}"></button>
                <span>${item.inCart}</span>  
                <button id="plus" class="fa fa-chevron-circle-right" itemTag="${item.tag}"></button>
            </div>
            <div class="total">₹${item.inCart * item.price}.00</div>
            </div>
           `
        });
        productContainer.innerHTML += `
       <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">
              Cart Total
          </h4>
          <h4 class="basketTotal">₹${cartCost}.00</h4>

       `;

    }
    //    productContainer.getElementsByClassName('fa-trash')[0].addEventListener('click', removeCartItem());
}
function ready() {
    var removeCartItemButtons = document.getElementsByClassName("fa-trash");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var decreaseCartItembuttons = document.getElementsByClassName("fa fa-chevron-circle-left");
    for (var i = 0; i < decreaseCartItembuttons.length; i++) {
        var dec = decreaseCartItembuttons[i];
        dec.addEventListener('click', decreaseCartItem)
    }
    var increaseCartItembuttons = document.getElementsByClassName("fa fa-chevron-circle-right");
    for (var i = 0; i < increaseCartItembuttons.length; i++) {
        var dec = increaseCartItembuttons[i];
        dec.addEventListener('click', increaseCartItem)
    }
}

function decreaseCartItem(event) {
    var decreaseButtonClicked = event.target
    //console.log(buttonClicked.getAttribute("itemTag"));
    reduceCartItem(decreaseButtonClicked.getAttribute("itemTag"));

}

function increaseCartItem(event) {
    var increaseButtonClicked = event.target
    //console.log(buttonClicked.getAttribute("itemTag"));
    updateCartItem(increaseButtonClicked.getAttribute("itemTag"));

}

function removeCartItem(event) {
    var buttonClicked = event.target
    if (confirm("Are you sure you want to remove this item?")) {
        buttonClicked.parentElement.parentElement.remove();
        //console.log("ITTTTEEEEMMMM", buttonClicked.getAttribute("itemTag"));
        updateCartTotal(buttonClicked.getAttribute("itemTag"));
    }

}
function updateCartTotal(itemTag) {
    //var cartItemContainer = document.getElementsByClassName("cartRow");
    let data = allStorage();
    //console.log("DAAAAAAATTTTTTAAAA", data);

    let jsData = JSON.parse(data[2])

    itemNo = jsData[itemTag.toString()]["inCart"]
    data[0] = data[0] - itemNo;
    //console.log("itemmmmm nooooo",itemNo)
    price = jsData[itemTag.toString()]["price"]
    data[1] = parseInt(data[1]) - (itemNo * price)
    delete jsData[itemTag.toString()]
    localStorage.setItem("cartNumbers", data[0])
    localStorage.setItem("totalCost", data[1])
    localStorage.setItem("productsInCart", JSON.stringify(jsData))
    let productNumbers = localStorage.getItem('cartNumbers');
    document.querySelector('.mr-right .nav-item span').textContent = data[0];
    // localStorage.clear();
    console.log("DAAAAAAATTTTTTAAAA", jsData);
    displayCart()
    location.reload()

}

function reduceCartItem(itemTag) {
    let data = allStorage();
    let jsData = JSON.parse(data[2])
    let cartNo = localStorage.getItem('cartNumbers')
    itemNo = jsData[itemTag.toString()]["inCart"]
    //console.log("item no.", typeof (itemNo))
    if (itemNo > 1) {


        //data[0]--;
        price = jsData[itemTag.toString()]["price"]
        data[1] = parseInt(data[1]) - price
        ///incart=jsData[itemTag.toString()]["inCart"]
        //console.log(incart);
        itemNo = itemNo - 1;
        //console.log(incart)
        jsData[itemTag.toString()]["inCart"] = itemNo;
        //delete jsData[itemTag.toString()]
        localStorage.setItem("cartNumbers", cartNo - 1)
        localStorage.setItem("totalCost", data[1])
        localStorage.setItem("productsInCart", JSON.stringify(jsData))
        //let productNumbers = localStorage.getItem('cartNumbers');
        document.querySelector('.mr-right .nav-item span').textContent = cartNo - 1;
        // localStorage.clear();
        //console.log("DAAAAAAATTTTTTAAAA", jsData);

        displayCart()
        location.reload()
    }
    else {
        updateCartTotal(itemTag)
    }
    location.reload()
}

function updateCartItem(itemTag) {
    let data = allStorage();
    let jsData = JSON.parse(data[2])
    let cartNo = localStorage.getItem('cartNumbers')
    //console.log("cart", typeof (cartNo))
    itemNo = jsData[itemTag.toString()]["inCart"]

    price = jsData[itemTag.toString()]["price"]
    data[1] = parseInt(data[1]) + price
    itemNo = itemNo + 1
    jsData[itemTag.toString()]["inCart"] = itemNo
    //delete jsData[itemTag.toString()]
    localStorage.setItem("cartNumbers", parseInt(cartNo) + 1)
    localStorage.setItem("totalCost", data[1])
    localStorage.setItem("productsInCart", JSON.stringify(jsData))
    let productNumbers = localStorage.getItem('cartNumbers');
    document.querySelector('.mr-right .nav-item span').textContent = productNumbers;
    displayCart()
    location.reload()

}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        //console.log(keys[i])
        values.push(localStorage.getItem(keys[i]));
    }

    return values;
}

onLoadCartNumbers();
displayCart();
ready();
