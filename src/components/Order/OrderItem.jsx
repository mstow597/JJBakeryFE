import { useEffect, useState } from "react";
import { SERVER_URL } from "../../env";
import {
  CalorieIcon,
  DollarIcon,
  MinusIcon,
  PlusIcon,
  ScaleIcon,
  ServingsPerOrderIcon,
} from "../UI/Icons/Icons";
import { cartActions } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderItem.module.css";
import { orderActions } from "../../store/order";
import { uiActions } from "../../store/ui";
import { useRef } from "react";

export default (props) => {
  const dispatch = useDispatch();
  const loadedImages = useSelector((state) => state.order.loadedImages);
  const cart = useSelector((state) => state.cart);

  const intervalRef = useRef(null);
  const [image, setImage] = useState(null);
  const [orderAmount, setOrderAmount] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    _id,
    name,
    imageAlt,
    imageSrc,
    caloriesPerServing,
    servingsPerOrder,
    pricePerOrder,
    sizePerOrder,
  } = props.item;
  const sizePerOrderArr = sizePerOrder.split(" ");
  sizePerOrderArr[1] = `${sizePerOrderArr[1][0].toUpperCase()}${sizePerOrderArr[1].slice(
    1,
  )}`;
  const sizePerOrderFormatted = `${sizePerOrderArr.join(" ")}`;

  useEffect(() => {
    return () => stopContinuousCount();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (loadedImages[imageSrc]) {
        setImage(loadedImages[imageSrc]);
        setImageLoaded(true);
      } else {
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
        setImageLoaded(true);
      }
    };
    fetchImage();
  }, [imageSrc]);

  const showItemDetailsHandler = () => {
    dispatch(orderActions.showOrderItemDetails(props.item));
  };

  const addItemToCartHandler = () => {
    const item = cart.items.find((item) => item.id === _id);
    const finalCount = item?.orderAmount + orderAmount || orderAmount;
    const addedItem = {
      id: _id,
      name,
      image,
      imageSrc,
      imageAlt,
      orderAmount,
      pricePerOrder,
    };

    if (!item || (item && finalCount <= 10)) {
      dispatch(cartActions.addItem(addedItem));
      dispatch(uiActions.showItemAddedSuccess(addedItem));
    } else dispatch(uiActions.showOrderExceeded({ item, orderAmount }));
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
    <li className={styles["order-item"]}>
      {!imageLoaded && <div className={styles["order-item-placeholder"]}></div>}
      {imageLoaded && (
        <img
          onClick={showItemDetailsHandler}
          className={styles["order-item-img"]}
          src={image}
          alt={imageAlt}
        ></img>
      )}
      <div className={styles["order-item-details"]}>
        <h2 className={styles["order-item-name"]}>{name}</h2>
        <ul className={styles["order-details-list"]}>
          <li className={styles["order-details-list-item"]}>
            <ScaleIcon />
            <span>
              <strong>{sizePerOrderFormatted}</strong>
              <span className={styles["order-item-details-subtext"]}>
                {" "}
                per order
              </span>
            </span>
          </li>
          <li className={styles["order-details-list-item"]}>
            <ServingsPerOrderIcon />
            <span>
              <strong>
                {servingsPerOrder}{" "}
                {servingsPerOrder === 1 ? "Serving" : "Servings"}
              </strong>
              <span className={styles["order-item-details-subtext"]}>
                {" "}
                per order
              </span>
            </span>
          </li>
          <li className={styles["order-details-list-item"]}>
            <CalorieIcon />
            <span>
              <strong>{caloriesPerServing} Calories</strong>
              <span className={styles["order-item-details-subtext"]}>
                {" "}
                per serving
              </span>
            </span>
          </li>
          <li className={styles["order-details-list-item"]}>
            <DollarIcon />
            <span>
              <strong>${pricePerOrder}</strong>
              <span className={styles["order-item-details-subtext"]}>
                {" "}
                per order
              </span>
            </span>
          </li>
        </ul>
        <div className={styles["order-add-to-cart"]}>
          <button
            onClick={addItemToCartHandler}
            className={styles["order--btn"]}
          >
            Add to Cart
          </button>
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
        </div>
      </div>
    </li>
  );
};
