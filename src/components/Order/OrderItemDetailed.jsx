import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import { orderActions } from "../../store/order";
import { useEffect, useState } from "react";
import styles from "./OrderItemDetailed.module.css";
import {
  CalorieIcon,
  Check,
  DollarIcon,
  Information,
  MinusIcon,
  PlusIcon,
  ScaleIcon,
  ServingsPerOrderIcon,
} from "../UI/Icons/Icons";
import { cartActions } from "../../store/cart";
import { useRef } from "react";
import { uiActions } from "../../store/ui";

export default () => {
  const dispatch = useDispatch();
  const loadedImages = useSelector((state) => state.order.loadedImages);
  const cart = useSelector((state) => state.cart);
  const {
    _id,
    name,
    description,
    imageAlt,
    imageSrc,
    ingredients,
    glutenFree,
    dairyFree,
    caloriesPerServing,
    pricePerOrder,
    servingsPerOrder,
    sizePerOrder,
  } = useSelector((state) => state.order.itemToShow);

  const intervalRef = useRef(null);
  const [image, setImage] = useState(null);
  const [orderAmount, setOrderAmount] = useState(1);

  useEffect(() => {
    return () => stopContinuousCount();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (loadedImages[imageSrc]) setImage(loadedImages[imageSrc]);
      else {
        const result = await fetch(`${SERVER_URL}/${imageSrc}`, {
          mode: "cors",
        });
        const data = await result.blob();
        const imageURL = URL.createObjectURL(data);
        dispatch(
          orderActions.addLoadedImage({
            imageSrc: imageSrc,
            imageURL: imageURL,
          }),
        );
        setImage(imageURL);
      }
    };
    fetchImage();
  }, [imageSrc]);

  const closeItemDetailsHandler = () => {
    dispatch(orderActions.hideOrderItemDetails());
  };

  const orderAmountExceededFn = (payload) => {
    dispatch(orderActions.hideOrderItemDetails());
    dispatch(uiActions.showOrderExceeded(payload));
  };

  const addItemToCartHandler = () => {
    const item = cart.items.find((item) => item.id === _id);
    const finalCount = item?.orderAmount + orderAmount || orderAmount;

    if (!item || (item && finalCount <= 10)) {
      dispatch(orderActions.hideOrderItemDetails());
      dispatch(
        cartActions.addItem({
          id: _id,
          name,
          image,
          imageSrc,
          imageAlt,
          orderAmount,
          pricePerOrder,
        }),
      );
    } else orderAmountExceededFn({ item, orderAmount });
  };

  const decrementCountHandler = () => {
    setOrderAmount((prevAmount) => {
      if (prevAmount <= 1) return 1;
      return prevAmount - 1;
    });
  };

  const incrementCountHandler = () => {
    setOrderAmount((prevAmount) => {
      if (prevAmount < 10) return (prevAmount += 1);
      return 10;
    });
  };

  const incrementCountContinuousHandler = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setOrderAmount((prevAmount) => {
        if (prevAmount < 10) return (prevAmount += 1);
        return 10;
      });
    }, 100);
  };

  const decrementCountContinousHandler = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setOrderAmount((prevAmount) => {
        if (prevAmount <= 1) return 1;
        return prevAmount - 1;
      });
    }, 100);
  };

  const stopContinuousCount = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <Modal classes={"modal-order-item"} onClose={closeItemDetailsHandler}>
      <div className={styles["order-item-detailed"]}>
        <img
          className={styles["order-item-detailed-img"]}
          src={image}
          alt={imageAlt}
        ></img>
        <div className={styles["order-item-details"]}>
          <h2 className={styles["order-item-name"]}>{name}</h2>
          <p className={styles["order-item-description"]}>{description}</p>
          <div className={styles["order-item-detailed-flexbox-2-col"]}>
            <div className={styles["order-details-container"]}>
              <h3 className={styles["order-item-subheading"]}>Details</h3>
              <ul className={styles["order-details-list"]}>
                <li className={styles["order-details-list-item"]}>
                  <ScaleIcon />
                  <span>
                    <strong>{sizePerOrder.toUpperCase()}</strong> per order
                  </span>
                </li>
                <li className={styles["order-details-list-item"]}>
                  <ServingsPerOrderIcon />
                  <span>
                    <strong>
                      {servingsPerOrder}{" "}
                      {servingsPerOrder === 1 ? "SERVING" : "SERVINGS"}
                    </strong>{" "}
                    per order
                  </span>
                </li>
                <li className={styles["order-details-list-item"]}>
                  <CalorieIcon />
                  <span>
                    <strong>{caloriesPerServing} CALORIES</strong> per serving
                  </span>
                </li>
                <li className={styles["order-details-list-item"]}>
                  <DollarIcon />
                  <span>
                    <strong>${pricePerOrder}</strong> per order
                  </span>
                </li>
                <li className={styles["order-details-list-item"]}>
                  <Information />
                  <span>
                    <strong>{glutenFree ? "" : "NOT"}</strong>{" "}
                    {glutenFree ? "G" : "g"}luten free
                  </span>
                </li>
                <li className={styles["order-details-list-item"]}>
                  <Information />
                  <span>
                    <strong>{dairyFree ? "" : "NOT"}</strong>{" "}
                    {dairyFree ? "D" : "d"}airy free
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles["order-ingredients-container"]}>
              <h3 className={styles["order-item-subheading"]}>Ingredients</h3>
              <ul className={styles["order-ingredients-list"]}>
                {ingredients.map((ingredient, index) => {
                  return (
                    <li
                      key={index}
                      className={styles["order-details-list-item"]}
                    >
                      <Check />
                      {ingredient}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles["order-count"]}>
              <button
                className={styles["order--btn-decrement"]}
                onClick={decrementCountHandler}
                onMouseDown={decrementCountContinousHandler}
                onMouseLeave={stopContinuousCount}
                onMouseUp={stopContinuousCount}
              >
                <MinusIcon />
              </button>
              <span className={styles["order-count-value"]}>{orderAmount}</span>
              <button
                className={styles["order--btn-decrement"]}
                onClick={incrementCountHandler}
                onMouseDown={incrementCountContinuousHandler}
                onMouseLeave={stopContinuousCount}
                onMouseUp={stopContinuousCount}
              >
                <PlusIcon />
              </button>
            </div>

            <div className={styles["order-add-to-cart"]}>
              <button
                onClick={addItemToCartHandler}
                className={styles["order--btn"]}
              >
                Add to Cart
              </button>
            </div>
            <div className={styles["order-close"]}>
              <button
                onClick={closeItemDetailsHandler}
                className={styles["order--btn"]}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
