//PLAY AUDIO FOR CLICK
let soundPop = new Audio("./img/sound-pop.mp3");
let soundDrop = new Audio("./img/sound-drop.mp3");

//JS FOR CART SYSTEM
let carts = document.querySelectorAll('.add-cart');
let cartsTag = document.querySelectorAll('.add-cartTag');
let cartsIcon = document.querySelectorAll('.add-cartIcon');

let cartBtn = document.querySelector('#cart-button');
cartBtn.addEventListener('click', () =>{
    displayCart();
    initializeDumpBtn();
});

function initializeDumpBtn(){
    cancelBtn = document.querySelectorAll('.dumpButton');
    for (let n=0; n < cancelBtn.length; n++){
        cancelBtn[n].addEventListener('click', () => {
            clickedItem = cancelBtn[n];
            if (clickedItem.classList.contains('dump-fd-popcorn')){
                dumpItem('fd-popcorn');
                products[0].inCart=0;
            };
            if (clickedItem.classList.contains('dump-fd-chicnugg')){
                dumpItem('fd-chicnugg');
                products[1].inCart=0;
            };
            if (clickedItem.classList.contains('dump-fd-mashedpotato')){
                dumpItem('fd-mashedpotato');
                products[2].inCart=0;
            };
            if (clickedItem.classList.contains('dump-fd-wedges')){
                dumpItem('fd-wedges');
                products[3].inCart=0;
            };
            if (clickedItem.classList.contains('dump-fd-juice')){
                dumpItem('fd-juice');;
                products[4].inCart=0;
            };
            if (clickedItem.classList.contains('dump-fd-npslushie')){
                dumpItem('fd-npslushie');
                products[5].inCart=0;
            };
            displayCart();
            $("#cartModal").modal('hide');
            setTimeout(function(){
                $("#cart-button").trigger("click");
            }, 200);
        });
    };
}

//SET UP PRODUCTS, IMPT TAG IS ITEM PHOTO NAME
let products = [
    {
        name: "Popcorn",
        tag: "fd-popcorn",
        dumpClass: "dump-fd-popcorn",
        price: 8.99,
        inCart: 0
    },
    {
        name: "Chicken Nuggets",
        tag: "fd-chicnugg",
        dumpClass: "dump-fd-chicnugg",
        price: 3.99,
        inCart: 0
    },
    {
        name: "Mashed Potato",
        tag: "fd-mashedpotato",
        dumpClass: "dump-fd-mashedpotato",
        price: 1.99,
        inCart: 0
    },
    {
        name: "Potato Wedges",
        tag: "fd-wedges",
        dumpClass: "dump-fd-wedges",
        price: 4.99,
        inCart: 0
    },
    {
        name: "Cranberry Juice",
        tag: "fd-juice",
        dumpClass: "dump-fd-juice",
        price: 5.99,
        inCart: 0
    },
    {
        name: "Rainbow Slushie",
        tag: "fd-npslushie",
        dumpClass: "dump-fd-npslushie",
        price: 3.99,
        inCart: 0
    }
];

//SET UP INDEX FOR ITEMS AND LISTEN FOR EVENTS
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartCount(products[i]);
        soundPop.play();
    });
};

for (let i=0; i < cartsIcon.length; i++){
    cartsIcon[i].addEventListener('click', () => {
        cartCount(products[i]);
        soundPop.play();
    });
};

for (let i=0; i < cartsTag.length; i++){
    cartsTag[i].addEventListener('click', () => {
        cartCount(products[i]);
        soundPop.play();
    });
};


//FUNCTION
function cartCount(selectedItem) {
    let memoryCount = localStorage.getItem('cartCount');
    memoryCount = parseInt(memoryCount);
    if (memoryCount){
        localStorage.setItem('cartCount',memoryCount+1);
        document.querySelector('.cart-btn-class span').textContent = memoryCount+1;
    } else {
        localStorage.setItem('cartCount',1);
        document.querySelector('.cart-btn-class span').textContent = 1;
    };
    setItems(selectedItem);
    addCost(selectedItem);
    animateCart();
}

function onLoadcartCount(){
    let memoryCount = localStorage.getItem('cartCount');
    if (memoryCount){
        document.querySelector('.cart-btn-class span').textContent = memoryCount;
    };
}

function setItems(selectedItem){
    let cartItems = localStorage.getItem('mainCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){ //THERE IS ITEM IN cartItems
        if (cartItems[selectedItem.tag] == undefined){ //MEANS ITEM IS NOT BELONGING TO ARRAY OF cartItems YET
            cartItems={...cartItems,
            [selectedItem.tag]:selectedItem};
        };
        cartItems[selectedItem.tag].inCart += 1;
    } else {
        selectedItem.inCart = 1;
        cartItems = {[selectedItem.tag]:selectedItem};
    };
    localStorage.setItem("mainCart", JSON.stringify(cartItems));
}

function addCost(selectedItem){
    let sumDollar = localStorage.getItem('totalCostDollar');
        if (sumDollar!=null){
            sumDollar = parseFloat(sumDollar)
            sumDollar += selectedItem.price;
            localStorage.setItem("totalCostDollar",sumDollar);
        }else{
            localStorage.setItem("totalCostDollar",selectedItem.price);
        };        
}

function displayCart(){
    let cartItems = localStorage.getItem('mainCart');
    cartItems = JSON.parse(cartItems);
    let productModal = document.querySelector(".productModal");

    if (cartItems && productModal){
        productModal.innerHTML = '';
        Object.values(cartItems).map(item => {
            productModal.innerHTML += `
            <div class="row productModal d-flex align-items-center">
                <span class="col-2"><img style="border: 1px solid white; -webkit-animation: rainbowBorder 30s infinite; -ms-keyframes: rainbowBorder 30s infinite;" src="./img/${item.tag}.jpg" class="img-fluid" style="width:100px;""></span>
                <span class="col-4">${item.name} <button class="dumpButton ${item.dumpClass} pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i></button></span>
                <span class="col-2 d-flex justify-content-center">$${item.price}</span>
                <span class="col-1 d-flex justify-content-center">${item.inCart}</span>
                <span class="col-3 d-flex justify-content-center">$${(item.price*item.inCart).toFixed(2)}</span>
            </div>
            `
        });
        totalCost = localStorage.getItem('totalCostDollar');
        totalCost = parseFloat(totalCost);
        productModal.innerHTML += `
            <hr><div class="row d-flex align-items-center">
                <h4 class="col-9">Grand Total</h4>
                <h4 class="col-3 d-flex justify-content-center">$${(totalCost).toFixed(2)}</h4>
            </div>
        `
    };
}

function dumpItem(selector){
    let cartItems = localStorage.getItem('mainCart');
    let totalCost = localStorage.getItem('totalCostDollar');
    let itemCount = localStorage.getItem('cartCount');
    cartItems = JSON.parse(cartItems);
    totalCost = parseFloat(totalCost);
    itemCount = parseInt(itemCount);
    totalCost -= (cartItems[selector].inCart * cartItems[selector].price);
    itemCount -= cartItems[selector].inCart;
    
    delete cartItems[selector];
    if (totalCost >= 0){
        localStorage.setItem("totalCostDollar", totalCost);
    } else {
        localStorage.setItem("totalCostDollar", 0.00);
    };
    if (itemCount >= 0){
        localStorage.setItem("cartCount", itemCount);
        document.querySelector('.cart-btn-class span').textContent = itemCount;
        localStorage.setItem("mainCart", JSON.stringify(cartItems));
    } else {
        localStorage.setItem("cartCount", 0);
        localStorage.setItem("mainCart", null);
        document.querySelector('.cart-btn-class span').textContent = 0;
    };    
    soundDrop.play();
}

//Animate function for item selection on cart button - add class
function animateCart(){
    let cartButton = document.getElementById('cart-button');
    if (cartButton.classList.contains('animateSelect') != true){
        cartButton.classList.add("animateSelect");
    };
    setTimeout(function(){
        cartButton.classList.remove("animateSelect");
    }, 1000);    
}

onLoadcartCount();

//JS SCRIPTS FOR SHOPPING CART ABOVE

//JQUERY FOR BUTTON BLUR
let myNavTogglebtn = document.getElementById('myNavTogglebtn');
myNavTogglebtn.addEventListener('blur', () =>{
    $("#myNavbar").collapse('hide');
});

//JUST TESTING
//let cartButton = document.getElementById('cart-button');
//let cartModal = document.getElementById('cartModal');
//cartButton.addEventListener('blur', () =>{
//    check = $(cartModal).is(':visible');
//    console.log(check)
//    if (check == false){
//        $("#clickCancel").trigger("click");
//        cartModal.classList.remove("active");
//    }else{
//        cartModal.classList.add("active");
//    };
//});