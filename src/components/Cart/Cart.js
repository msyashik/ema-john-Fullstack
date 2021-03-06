import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, prd) => total + prd.price * prd.quantity || 1,
    0
  );
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  let tax = Math.round(total / 10);
  let grandTotal = Math.round(total + shipping + tax);

  return (
    <div>
      <h4>Order Summary</h4>
      <p>Items ordered: {cart.length}</p>
      <p>Product Price: {total}</p>
      <p>
        <small>Shipping Cost: {shipping}</small>
      </p>
      <p>
        <small>Tax + Vat: {tax}</small>
      </p>
      <p>Total Price: {grandTotal}</p>
      {props.children}
    </div>
  );
};

export default Cart;
