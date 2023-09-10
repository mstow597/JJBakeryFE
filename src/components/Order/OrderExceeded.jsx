import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import { uiActions } from "../../store/ui";
import Button from "../UI/Button/Button";
import styles from "./OrderExceeded.module.css";

export default () => {
  const dispatch = useDispatch();
  const { orderedItem, orderAmount } = useSelector((state) => state.ui);

  const closeOrderExceededHandler = () => {
    dispatch(uiActions.closeOrderExceeded());
  };

  return (
    <Modal onClose={closeOrderExceededHandler} classes="order-exceeded">
      <div className={styles["order-exceeded"]}>
        <h3 className={styles["order-exceeded-heading"]}>Sorry!</h3>
        <p className={styles["order-exceeded-description"]}>
          We were unable to add the following to your cart:
        </p>
        <div className={styles["order-item"]}>
          <img src={orderedItem.image} className={styles["order-item-img"]} />
          <strong className={styles["order-item-quantity"]}>
            {orderAmount}x
          </strong>
          <span>
            {`${orderedItem.name[0].toUpperCase()}${orderedItem.name.slice(
              1,
            )} `}
            <span className={styles["order-item-price"]}>
              (${orderedItem.pricePerOrder}/ea)
            </span>
          </span>
        </div>
        <p className={styles["order-exceeded-description"]}>
          Attempting to do so exceeds maximum order limit per item.
        </p>
        <p className={styles["order-exceeded-description"]}>
          Maximum order limit per item: 10
        </p>
        <p className={styles["order-exceeded-description"]}>
          Current cart quantity for {orderedItem.name}:{" "}
          {orderedItem.orderAmount}
        </p>
        <p className={styles["order-exceeded-description"]}>
          For catering or bulk orders for events/gatherings, please contact us.
          Thank you!
        </p>
        <Button onClick={closeOrderExceededHandler}>Close</Button>
      </div>
    </Modal>
  );
};
