import {updateCartQuantity} from '../data/cart.js';

//document.querySelector('.js-cart-quantity-orders').innerHTML = updateCartQuantity();

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}