import { useDispatch, useSelector } from "react-redux";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import Button from "../UI/Button/Button";
import styles from "./Hero.module.css";
import peanutButterParadise from "./imgs-hero/peanutButterParadiseDark.webp";
import { uiActions } from "../../store/ui";

export default () => {
  const dispatch = useDispatch();

  const showOrderHandler = () => {
    dispatch(uiActions.showOrder());
  };

  return (
    <SlideInWrapper>
      <section className={styles.hero}>
        <div className={styles.background}>
          <div className={styles["image-container"]}>
            <img src={peanutButterParadise}></img>
          </div>
        </div>
        <div className={styles["hero-text"]}>
          <h1 className={styles["hero-title"]}>
            <span className={styles["hero-text-highlighted"]}>Experience</span>{" "}
            the Delight of our
            <span className={styles["hero-text-highlighted"]}>
              {" "}
              Handcrafted
            </span>{" "}
            Baked Goods
          </h1>
          <p className={styles["hero-description"]}>
            Browse our menu, place your order, and savor the flavor of our
            freshly prepared baked goods.
          </p>
          <Button onClick={showOrderHandler}>Start Your Order</Button>
        </div>
      </section>
    </SlideInWrapper>
  );
};
