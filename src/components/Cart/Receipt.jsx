import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import styles from "./Receipt.module.css";
import { uiActions } from "../../store/ui";
import Button from "../UI/Button/Button";

export default () => {
  const dispatch = useDispatch();
  const { orderId, products, subtotal, taxes, purchasePrice, orderPaid } =
    useSelector((state) => state.receipt);
  const loadedImages = useSelector((state) => state.order.loadedImages);
  const productList = useSelector((state) => state.order.productList);

  const items = products.map((product) => {
    const matchingProduct = productList.find(
      (prod) => prod._id === product._id,
    );
    const image = loadedImages[matchingProduct.imageSrc];
    return {
      name: matchingProduct.name,
      orderAmount: product.quantity,
      pricePerOrder: matchingProduct.pricePerOrder,
      image: image,
    };
  });

  console.log(items);

  const closeReceiptHandler = () => {
    dispatch(uiActions.closeReceipt());
  };

  return (
    <Modal onClose={closeReceiptHandler} classes="modal-receipt">
      <div className={styles.checkout}>
        <h2 className={styles["checkout-heading"]}>Receipt</h2>
        <p>
          Thank you for trusting us with your bakery needs! We are processing
          your order.{" "}
        </p>
        <p>
          Your order confirmation:
          <strong> {orderId}</strong>
        </p>
        <ul className={styles["cart-items-list"]}>
          {items.map((item, index) => {
            return (
              <li key={index} className={styles["cart-item"]}>
                <img src={item.image} className={styles["cart-img"]} />
                <span className={styles["cart-item-quantity"]}>
                  <strong>{item.orderAmount}x</strong>
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
        <div className={styles["cart-cost-container"]}>
          <span className={styles["cart-subtotal-text"]}>Subtotal:</span>
          <span className={styles["cart-subtotal-value"]}>${subtotal}</span>
          <span className={styles["cart-taxes-text"]}>Taxes:</span>
          <span className={styles["cart-taxes-value"]}>${taxes}</span>
          <span className={styles["cart-total-text"]}>Total:</span>
          <span className={styles["cart-total-value"]}>${purchasePrice}</span>
        </div>
        <Button onClick={closeReceiptHandler}>Close</Button>
      </div>
    </Modal>
  );
};
