import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedCheckOut = () => {
    history.push("/shipment");
  };

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  //cart data
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://safe-chamber-11742.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt=""></img>;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => {
          return (
            <ReviewItem
              key={pd.key}
              product={pd}
              handleRemoveProduct={handleRemoveProduct}
            ></ReviewItem>
          );
        })}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="main-button">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
