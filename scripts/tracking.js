import { getProduct,loadProductsFetch } from "../data/products.js";
import { orders } from "./order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "../data/cart.js";


async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const product = getProduct(productId);
  const matchingProduct = getProductDetails(orderId,productId);
  const estimatedDeliveryTime = dayjs(matchingProduct.estimatedDeliveryTime).format('MMMM D');
  const percentProgress = calculatePercentProgress(orderId,matchingProduct);
  const trackPackageHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${estimatedDeliveryTime}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProduct.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label ${percentProgress<50 ? 'current-status': '' }">
          Preparing
        </div>
        <div class="progress-label ${(percentProgress>=50 && percentProgress < 100) ? 'current-status': ''}">
          Shipped
        </div>
        <div class="progress-label ${percentProgress>=100 ? 'current-status': '' }">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style = "width: ${percentProgress}%"></div>
      </div>
    </div>
    `
  ;

  document.querySelector('.js-main').innerHTML = trackPackageHTML;
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
}

loadPage();

function getProductDetails(orderId, productId) {
  let matchingProduct = [];
  orders.forEach((order) => {
    if(order.id === orderId){
      order.products.forEach((product) => {
        if(product.productId === productId){
          matchingProduct = product;
        }
      })
    }
  });
  return matchingProduct;
}

function calculatePercentProgress(orderId,productDetails) {
  const today = dayjs();
  let Order = [];
  orders.forEach((order) => {
    if(order.id === orderId) {
      Order = order;
    }
  });
  const orderTime = dayjs(Order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime))*100; 
  return percentProgress;
}