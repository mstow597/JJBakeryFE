import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import { uiActions } from "../../store/ui";
import Button from "../UI/Button/Button";
import styles from "./OrderItemAddedSuccess.module.css";

export default () => {
  const { orderedItem } = useSelector((state) => state.ui);
  const { items } = useSelector((state) => state.cart);
  const matchingItem = items.find((item) => item._id === orderedItem._id);
  const totalCost = orderedItem.orderAmount * orderedItem.pricePerOrder;
  console.log(matchingItem);

  const dispatch = useDispatch();

  const closeOrderExceededHandler = () => {
    dispatch(uiActions.closeItemAddedSuccess());
  };

  return (
    <Modal onClose={closeOrderExceededHandler} classes="order-exceeded">
      <div className={styles["order-exceeded"]}>
        <h3 className={styles["order-exceeded-heading"]}>Item Added to Cart</h3>
        <div className={styles["order-item"]}>
          <img src={orderedItem.image} className={styles["order-item-img"]} />
          <strong className={styles["order-item-quantity"]}>
            {orderedItem.orderAmount}x
          </strong>
          <span>
            {`${orderedItem.name[0].toUpperCase()}${orderedItem.name.slice(
              1,
            )} `}
            <span className={styles["order-item-price"]}>
              (${orderedItem.pricePerOrder}/ea)
            </span>
          </span>
          <strong className={styles["order-item-subtotal"]}>
            ${totalCost.toFixed(2)}
          </strong>
        </div>
        <Button onClick={closeOrderExceededHandler}>Close</Button>
      </div>
    </Modal>
  );
};
