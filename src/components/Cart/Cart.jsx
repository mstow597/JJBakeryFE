import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import Button from "../UI/Button/Button";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  SadFace,
  Trash,
} from "../UI/Icons/Icons";
import { cartActions } from "../../store/cart";

export default (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    dispatch(uiActions.showCheckout());
  };

  const closeCartHandler = () => {
    dispatch(uiActions.closeCart());
  };

  const itemQuantityIncrementHandler = (item) => {
    return () => {
      if (item.orderAmount < 10)
        dispatch(
          cartActions.addItem({
            id: item.id,
            orderAmount: 1,
            pricePerOrder: item.pricePerOrder,
          }),
        );
    };
  };

  const itemQuantityDecrementHandler = (item) => {
    return () => {
      if (item.orderAmount > 1) dispatch(cartActions.decreaseItemAmount(item));
    };
  };

  const removeItemHandler = (item) => {
    return () => {
      dispatch(cartActions.removeItem(item));
    };
  };

  return (
    <Modal onClose={closeCartHandler} classes={"modal-shopping-cart"}>
      <div className={styles.cart}>
        <CloseIcon onClick={closeCartHandler}></CloseIcon>
        <h2 className={styles["cart-heading"]}>Shopping Cart</h2>
        {cart.items.length > 0 && (
          <>
            <ul className={styles["cart-items-list"]}>
              {cart.items.map((item, index) => {
                return (
                  <li key={index} className={styles["cart-item"]}>
                    <button
                      className={styles["cart-item-remove"]}
                      onClick={removeItemHandler(item)}
                    >
                      <Trash />
                    </button>
                    <img src={item.image} className={styles["cart-img"]} />
                    <span className={styles["cart-item-quantity"]}>
                      <button
                        className={styles["cart-item-quantity-arr"]}
                        onClick={itemQuantityIncrementHandler(item)}
                      >
                        &#9650;
                      </button>
                      <strong>{item.orderAmount}x</strong>
                      <button
                        className={styles["cart-item-quantity-arr"]}
                        onClick={itemQuantityDecrementHandler(item)}
                      >
                        &#9660;
                      </button>
                    </span>
                    <span>
                      {`${item.name[0].toUpperCase()}${item.name.slice(1)}`}{" "}
                      <span className={styles["cart-item-price"]}>
                        (${item.pricePerOrder}/ea)
                      </span>
                    </span>
                    <span className={styles["cart-item-subtotal"]}>
                      <strong>
                        ${(item.orderAmount * item.pricePerOrder).toFixed(2)}
                      </strong>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className={styles["cart-checkout"]}>
              <Button onClick={checkoutHandler}>Checkout</Button>
              <span className={styles["cart-subtotal-aggregate"]}>
                Subtotal: ${cart.totalCost.toFixed(2)}
              </span>
            </div>
          </>
        )}
        {cart.items.length === 0 && (
          <div className={styles["cart-empty"]}>
            <SadFace />
            <span className={styles["cart-empty-text"]}>
              Your Cart is Empty
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
};
