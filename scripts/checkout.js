import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
  });
})
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
//it runs the inner function immediately
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });

  }).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  });
})
//resolve is function - let us control when to go to the next step
// multiple callbacks cause nesting and that's why use promise
/*
loadProducts(() => {
   renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/