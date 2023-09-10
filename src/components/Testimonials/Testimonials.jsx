import { useState } from "react";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import testimonialImg1 from "./img/testimonial1.webp";
import testimonialImg2 from "./img/testimonial2.webp";
import testimonialImg3 from "./img/testimonial3.webp";
import testimonialImg4 from "./img/testimonial4.webp";
import styles from "./Testimonials.module.css";
import { ChevronLeft, ChevronRight } from "../UI/Icons/Icons";

const testimonials = [
  "I recently had the pleasure of indulging in the peanut putter paradise cake from this bakery, and it was an absolute delight. The perfect blend of rich peanut butter flavor and moist cake layers created a true paradise for my taste buds. It's a must-try for anyone with a sweet tooth!",
  "Let me rave about the macarons from this bakery - they're not just desserts, they're exquisite pieces of art! The delicate shells and a symphony of flavors with every bite make them an irresistible treat. It's clear that the bakers put immense cake into crafting these delightful confections.",
  "When I tasted the canoli from this bakery, I was instantly transported to the streets of Italy. The crispy, golden-brown shell, generously filled with creamy ricotta, was a perfect balance of textures and flavors. It's evident that this bakery values tradition and authenticity. I highly recommend this bakery.",
  "The apple Strudel at this bakery is a true masterpiece. The flaky layers of pastry enveloping the spiced apple filling create a harmonious blend of sweetness and warmth. With every forkful, you can taste the dedication to quality and the love for baking. A comforting dessert that feels like home.",
];

export default () => {
  const [carouselCount, setCarouselCount] = useState(0);

  const decrementCarouselCountHandler = () => {
    if (carouselCount === 0) setCarouselCount(3);
    else setCarouselCount((prev) => prev - 1);
  };

  const incrementCarouselCountHandler = () => {
    if (carouselCount === 3) setCarouselCount(0);
    else setCarouselCount((prev) => prev + 1);
  };

  const carouselBtnClickHandler = (count) => {
    return () => {
      setCarouselCount(count);
    };
  };

  return (
    <SlideInWrapper>
      <div className={styles.testimonials}>
        {carouselCount === 0 && (
          <div className={styles["testimonials-container"]}>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-left"]}`}
              onClick={decrementCarouselCountHandler}
            >
              <ChevronLeft />
            </div>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-right"]}`}
              onClick={incrementCarouselCountHandler}
            >
              <ChevronRight />
            </div>
            <img
              className={styles["testimonials-img"]}
              src={testimonialImg1}
            ></img>
            <span className={styles["testimonials-author"]}>Allison</span>
            <p className={styles["testimonials-text"]}>
              <span className={styles["testimonials-text-quotation"]}>
                &#10077;{" "}
              </span>
              {testimonials[0]}
              <span className={styles["testimonials-text-quotation"]}>
                {" "}
                &#10078;
              </span>
            </p>
          </div>
        )}
        {carouselCount === 1 && (
          <div className={styles["testimonials-container"]}>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-left"]}`}
              onClick={decrementCarouselCountHandler}
            >
              <ChevronLeft />
            </div>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-right"]}`}
              onClick={incrementCarouselCountHandler}
            >
              <ChevronRight />
            </div>
            <img
              className={styles["testimonials-img"]}
              src={testimonialImg2}
            ></img>
            <span className={styles["testimonials-author"]}>Stephanie</span>
            <p className={styles["testimonials-text"]}>
              <span className={styles["testimonials-text-quotation"]}>
                &#10077;{" "}
              </span>
              {testimonials[1]}
              <span className={styles["testimonials-text-quotation"]}>
                {" "}
                &#10078;
              </span>
            </p>
          </div>
        )}
        {carouselCount === 2 && (
          <div className={styles["testimonials-container"]}>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-left"]}`}
              onClick={decrementCarouselCountHandler}
            >
              <ChevronLeft />
            </div>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-right"]}`}
              onClick={incrementCarouselCountHandler}
            >
              <ChevronRight />
            </div>
            <img
              className={styles["testimonials-img"]}
              src={testimonialImg3}
            ></img>
            <span className={styles["testimonials-author"]}>Jack</span>
            <p className={styles["testimonials-text"]}>
              <span className={styles["testimonials-text-quotation"]}>
                &#10077;{" "}
              </span>
              {testimonials[2]}
              <span className={styles["testimonials-text-quotation"]}>
                {" "}
                &#10078;
              </span>
            </p>
          </div>
        )}
        {carouselCount === 3 && (
          <div className={styles["testimonials-container"]}>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-left"]}`}
              onClick={decrementCarouselCountHandler}
            >
              <ChevronLeft />
            </div>
            <div
              className={`${styles["chevron-container"]} ${styles["chevron-right"]}`}
              onClick={incrementCarouselCountHandler}
            >
              <ChevronRight />
            </div>
            <img
              className={styles["testimonials-img"]}
              src={testimonialImg4}
            ></img>
            <span className={styles["testimonials-author"]}>John</span>
            <p className={styles["testimonials-text"]}>
              <span className={styles["testimonials-text-quotation"]}>
                &#10077;{" "}
              </span>
              {testimonials[3]}
              <span className={styles["testimonials-text-quotation"]}>
                {" "}
                &#10078;
              </span>
            </p>
          </div>
        )}
        <div className={styles.dots}>
          <div
            className={`${styles.dot} ${
              carouselCount === 0 ? `${styles["dot--active"]}` : ""
            }`}
            onClick={carouselBtnClickHandler(0)}
          ></div>
          <div
            className={`${styles.dot} ${
              carouselCount === 1 ? `${styles["dot--active"]}` : ""
            }`}
            onClick={carouselBtnClickHandler(1)}
          ></div>
          <div
            className={`${styles.dot} ${
              carouselCount === 2 ? `${styles["dot--active"]}` : ""
            }`}
            onClick={carouselBtnClickHandler(2)}
          ></div>
          <div
            className={`${styles.dot} ${
              carouselCount === 3 ? `${styles["dot--active"]}` : ""
            }`}
            onClick={carouselBtnClickHandler(3)}
          ></div>
        </div>
      </div>
    </SlideInWrapper>
  );
};
