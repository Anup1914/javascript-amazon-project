import { updateCartQuantity } from "../../data/cart.js";

export function updateCheckoutItems(){
  document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;
}