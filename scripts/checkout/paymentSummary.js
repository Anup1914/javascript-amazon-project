import {cart, updateCartQuantity} from '../../data/cart.js' ;
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from "../utils/money.js"; 
import { addOrder } from '../../scripts/orders.js';
import { loadPage } from '../checkout.js';
import { renderOrderSummary } from './orderSummary.js';



export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeCents * 0.1;
  const totalCents = totalBeforeCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>`
  ;

  if(document.querySelector('.js-payment-summary')){
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  }

  if(document.querySelector('.js-place-order')){
  document.querySelector('.js-place-order')
  .addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
        })
      });
    
      const order = await response.json();
      console.log(order);
      addOrder(order);
    } catch(error) {
      console.log('Unexpected error.Try again later');
    }
    window.location.href = 'orders.html';
  });
}
}

