import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, updateCartQuantity } from "../data/cart.js";
import { updateCheckoutItems } from "./checkout/checkoutHeader.js";
//import '../data/car.js';
//import '../data/backend-practice.js';

export async function loadPage() { //shortcut for Promise
 
  try{ // cna be used to handle any unexpected when code is correct
     
    //throw 'error1';

    await loadProductsFetch(); // only use when inside async function
    //return 'value2';  returns promise
    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        //reject('error3');
        resolve('value3');
      });
    });

  } catch(error) {
    console.log('Unexpected error. Please try again later.')
  }
  
  updateCheckoutItems();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();


/*
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