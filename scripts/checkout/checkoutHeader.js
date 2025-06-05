import { updateCartQuantity } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

async function loadPage() {
  await loadProductsFetch();

  let cartQuantity = updateCartQuantity();
  const checkoutItems = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link"
          href="amazon.html">${cartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
  `;
  if(document.querySelector('.js-checkout-header')){
    document.querySelector('.js-checkout-header').innerHTML = checkoutItems;
  }
}
loadPage();