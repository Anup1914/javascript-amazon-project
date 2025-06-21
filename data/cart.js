export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [];
  }
}

function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
  let matchingItem;
    if(!cart){
      cart.push({
        productId: productId,
        quantity: productQuantity,
        deliveryOptionId: '1'
      });
    }
    else{
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });

      if(matchingItem){
        matchingItem.quantity += productQuantity;
      }
      else{
        cart.push({
          productId: productId,
          quantity: productQuantity,
          deliveryOptionId: '1'
        });
      }
    }
    updateCartQuantity();
    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId , deliveryOptionId){
  let matchingItem;

    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    fun();
    });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export function updateCartQuantity() {
  if(!cart){
    return 0;
  }
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  updateCartQuantity();
  saveToStorage();
}

export function resetCart() {
  cart = [];
  saveToStorage();
}