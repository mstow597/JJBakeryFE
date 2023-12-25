import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../env";
import { uiActions } from "../../store/ui";
import Modal from "../UI/Modal/Modal";
import styles from "./Checkout.module.css";
import { useRef } from "react";
import { checkoutActions } from "../../store/checkout";
import validator from "validator";
import { useEffect } from "react";
import { useState } from "react";
import { CloseIcon, FailIcon, SuccessIcon } from "../UI/Icons/Icons";
import Button from "../UI/Button/Button";
import { receiptActions } from "../../store/receipt";
import { cartActions } from "../../store/cart";

const formattedZipValue = (zip) => {
  if (zip.length < 6) return zip;
  if (zip.length >= 6 && zip.length <= 9) return `${zip.slice(0, 5)} - ${zip.slice(5)}`;
  if (zip.length > 9) return `${zip.slice(0, 5)} - ${zip.slice(5, 9)}`;
};

const filterZip = (zip) => {
  return zip.replaceAll(/[^0-9]/g, "");
};

const formattedPhoneValue = (phone) => {
  if (phone.length <= 3) return phone;
  if (phone.length >= 4 && phone.length < 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  if (phone.length >= 6 && phone.length <= 10)
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}${phone.length > 6 ? ` - ${phone.slice(6)}` : ""}`;
  if (phone.length > 10) return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)} - ${phone.slice(6, 10)}`;
};

const filterPhone = (phone) => {
  return phone.replaceAll(/[^0-9]/g, "");
};

export default () => {
  const dispatch = useDispatch();
  const { cartId, totalCost, items } = useSelector((state) => state.cart);
  const { isLoggedIn, userName, userPhone } = useSelector((state) => state.auth);
  const {
    checkoutAsGuest,
    paymentTypeSelected,
    paymentType,
    nameValue,
    zipValue,
    phoneValue,
    nameValueChanged,
    phoneValueChanged,
  } = useSelector((state) => state.checkout);

  const [isMounted, setIsMounted] = useState(false);
  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingPhone, setIsTypingPhone] = useState(false);
  const [isTypingZip, setIsTypingZip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const filteredZip = filterZip(zipValue);
  const formattedZip = formattedZipValue(filteredZip);
  const filteredPhone = filterPhone(phoneValue);
  const formattedPhone = formattedPhoneValue(filteredPhone);

  const validateName = (name) => validator.isAlphanumeric(name.replaceAll(/\s\-/g, ""));

  const zipIsValid = /(^\d{5}$)|(^\d{5}(\ -\ )\d{4}$)/.test(formattedZip);
  const nameIsValid = validator.isAlphanumeric(nameValue.replaceAll(/[\s-]/g, ""));

  const phoneIsValid = /^\(?(\d{3})\)?[- ]?(\d{3})(\ -\ )?(\d{4})$/.test(formattedPhone);
  const allInputsValidCard = nameIsValid && phoneIsValid && zipIsValid;
  const allInputsValidInStore = nameIsValid && phoneIsValid;

  const checkoutTypeRef = useRef();
  const checkoutTypeContain = useRef();
  const checkoutTypeBtnRef = useRef();
  const paymentTypeRef = useRef();
  const paymentTypeContain = useRef();
  const payInStoreBtnRef = useRef();
  const payNowWithCardBtnRef = useRef();
  const billingRef = useRef();
  const billingContain = useRef();

  useEffect(() => {
    if (checkoutAsGuest) toggleCheckoutTabHandler(checkoutTypeRef, checkoutTypeContain)();
    if (paymentTypeSelected) {
      toggleCheckoutTabHandler(paymentTypeRef, paymentTypeContain)();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !nameValueChanged) dispatch(checkoutActions.setNameValue(userName));
    if (isLoggedIn && !phoneValueChanged) dispatch(checkoutActions.setPhoneValue(userPhone));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsTypingName(true);
      const timer = setTimeout(() => {
        setIsTypingName(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [nameValue]);

  useEffect(() => {
    if (isMounted) {
      setIsTypingPhone(true);
      const timer = setTimeout(() => {
        setIsTypingPhone(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [phoneValue]);

  useEffect(() => {
    if (isMounted) {
      setIsTypingZip(true);
      const timer = setTimeout(() => {
        setIsTypingZip(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [zipValue]);

  const guestHandler = () => {
    if (checkoutAsGuest) return;

    dispatch(checkoutActions.checkoutAsGuest());

    toggleCheckoutTabHandler(checkoutTypeRef, checkoutTypeContain)();
  };

  const signInHandler = () => {
    dispatch(uiActions.showLogin());
  };

  const closeCheckoutHandler = () => {
    dispatch(uiActions.closeCheckout());
  };

  const payInStoreHandler = () => {
    if (paymentTypeSelected && paymentType === "instore") return;

    dispatch(checkoutActions.setPaymentType("instore"));

    toggleCheckoutTabHandler(paymentTypeRef, paymentTypeContain)();
  };

  const payWithCardHandler = () => {
    if (paymentTypeSelected && paymentType === "card") return;

    dispatch(checkoutActions.setPaymentType("card"));

    toggleCheckoutTabHandler(paymentTypeRef, paymentTypeContain)();
  };

  const toggleCheckoutTabHandler = (ref, refContain) => {
    return () => {
      if (ref.current.classList.contains(styles["hidden"])) ref.current.classList.remove(styles["hidden"]);

      if (ref === billingRef && paymentType === "instore")
        ref.current.classList.toggle(styles["hide-in-store-content"]);
      else if (ref === billingRef && paymentType === "card") ref.current.classList.toggle(styles["hide-form-content"]);
      else ref.current.classList.toggle(styles["hide-content"]);

      if (ref === billingRef && paymentType === "card") refContain.current.classList.toggle(styles["hide-form-card"]);
      else if (ref === billingRef && paymentType === "instore")
        refContain.current.classList.toggle(styles["hide-form-in-store"]);
      else refContain.current.classList.toggle(styles["hide-tab"]);

      if (
        ref.current.classList.contains(styles["hide-content"]) ||
        ref.current.classList.contains(styles["hide-form-content"]) ||
        ref.current.classList.contains(styles["hide-in-store-content"])
      )
        setTimeout(() => {
          ref.current.classList.add(styles["hidden"]);
        }, 450);
    };
  };
  const nameInputChangeHandler = (event) => {
    dispatch(checkoutActions.setNameValue(event.target.value));
  };

  const phoneInputChangeHandler = (event) => {
    dispatch(checkoutActions.setPhoneValue(event.target.value));
  };

  const zipInputChangeHandler = (event) => {
    dispatch(checkoutActions.setZipValue(event.target.value));
  };

  const submitOrderHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitFailed(false);
    /******************************************************************
     ******************************************************************
     * If Signed in - Checking out as User - simply send orderNumber  *
     * as cart info is persistent and available in DB                 *
     ******************************************************************
     *****************************************************************/
    if (isLoggedIn) {
      const requestData = {
        token: document.cookie.split("=")[1],
        orderNumber: cartId,
        orderName: nameValue,
        phone: filteredPhone,
      };
      if (paymentType === "card") requestData.zip = zipValue;

      const response = await fetch(`${SERVER_URL}/api/v1/orders/me/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        setSubmitFailed(true);
        setIsSubmitting(false);
        return;
      }

      /* Otherwise update state to show receipt. Server should be sending confirmation with receipt data.  */
      const data = await response.json();

      dispatch(receiptActions.setReceipt(data.data.submittedOrder));
      setSubmitSuccess(true);

      setTimeout(async () => {
        const getPersistentCart = async () => {
          const response = await fetch(`${SERVER_URL}/api/v1/orders/me`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              token: document.cookie.split("=")[1],
            }),
          });

          const data = await response.json();

          return data;
        };

        const data = await getPersistentCart();
        console.log(data);
        const cart = {
          id: data.cart._id,
          items: data.cart.products,
        };
        localStorage.removeItem("cart");
        dispatch(cartActions.emptyCart());
        dispatch(cartActions.setCart(cart));
        dispatch(uiActions.showReceipt());
      }, 1500);
    } else {
      /******************************************************************
       ******************************************************************
       * Otherwise, we are checking out as Guest - must send item data. *
       ******************************************************************
       *****************************************************************/
      const orderedProducts = items.map((product) => {
        return {
          _id: product.id,
          quantity: product.orderAmount,
        };
      });
      let requestData;

      requestData = {
        orderName: nameValue,
        phone: filteredPhone,
        orderedProducts: orderedProducts,
      };

      if (paymentType === "card") requestData.billingZip = zipValue;

      const response = await fetch(`${SERVER_URL}/api/v1/orders/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        setSubmitFailed(true);
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);

      const data = await response.json();

      dispatch(receiptActions.setReceipt(data.data.submittedOrder));

      setTimeout(() => {
        dispatch(uiActions.showReceipt());
        localStorage.removeItem("cart");
        dispatch(cartActions.emptyCart());
      }, 1500);
    }
    setIsSubmitting(false);
  };

  const guestBtnStyles = `${styles["checkout-type-btn"]} ${checkoutAsGuest ? styles["btn-selected"] : ""}`;
  const payInStoreBtnStyles = `${styles["payment-option-btn"]} ${
    paymentType === "instore" ? styles["btn-selected"] : ""
  }`;

  const payNowWithCardBtnStyles = `${styles["payment-option-btn"]} ${
    paymentType === "card" ? styles["btn-selected"] : ""
  }`;

  return (
    <Modal onClose={closeCheckoutHandler} classes="modal-checkout">
      <div className={styles.checkout}>
        <CloseIcon onClick={closeCheckoutHandler}></CloseIcon>
        <h2 className={styles["checkout-heading"]}>Checkout</h2>
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
                  <span className={styles["cart-item-price"]}>(${item.pricePerOrder}/ea)</span>
                </span>
                <span className={styles["cart-item-subtotal"]}>
                  <strong>${(item.orderAmount * item.pricePerOrder).toFixed(2)}</strong>
                </span>
              </li>
            );
          })}
        </ul>
        <div className={styles["cart-cost-container"]}>
          <span className={styles["cart-subtotal-text"]}>Subtotal:</span>
          <span className={styles["cart-subtotal-value"]}>${totalCost.toFixed(2)}</span>
          <span className={styles["cart-taxes-text"]}>Taxes:</span>
          <span className={styles["cart-taxes-value"]}>${(totalCost * 0.08).toFixed(2)}</span>
          <span className={styles["cart-total-text"]}>Total:</span>
          <span className={styles["cart-total-value"]}>${(totalCost + totalCost * 0.08).toFixed(2)}</span>
        </div>
        <div className={styles["checkout-footer"]}>
          {!isLoggedIn && (
            <div className={styles["checkout-type"]} ref={checkoutTypeContain}>
              <h3
                className={styles["checkout-type-heading"]}
                onClick={toggleCheckoutTabHandler(checkoutTypeRef, checkoutTypeContain)}
              >
                Checkout Type
              </h3>
              <div className={styles["checkout-type-options"]} ref={checkoutTypeRef}>
                <div className={styles["checkout-type-option"]}>
                  <button ref={checkoutTypeBtnRef} onClick={guestHandler} className={guestBtnStyles} />
                  <span className={styles["checkout-type-text"]}>Continue as Guest</span>
                </div>
                <div className={styles["checkout-type-option"]}>
                  <button onClick={signInHandler} className={styles["checkout-type-btn"]} />
                  <span className={styles["checkout-type-text"]}>Sign in or Create Account</span>
                </div>
              </div>
            </div>
          )}
          {(isLoggedIn || checkoutAsGuest) && (
            <div className={styles["payment"]} ref={paymentTypeContain}>
              <h3
                className={styles["payment-heading"]}
                onClick={toggleCheckoutTabHandler(paymentTypeRef, paymentTypeContain)}
              >
                Payment Type
              </h3>
              <div className={styles["payment-options"]} ref={paymentTypeRef}>
                <div className={styles["payment-option"]}>
                  <button ref={payInStoreBtnRef} onClick={payInStoreHandler} className={payInStoreBtnStyles} />
                  <span className={styles["payment-option-text"]}>Pay in store</span>
                </div>
                <div className={styles["payment-option"]}>
                  <button ref={payNowWithCardBtnRef} onClick={payWithCardHandler} className={payNowWithCardBtnStyles} />
                  <span className={styles["payment-option-text"]}>Pay now with card</span>
                </div>
              </div>
              <div></div>
            </div>
          )}
          {paymentTypeSelected && (
            <div
              className={paymentType === "card" ? styles["billing-card"] : styles["billing-in-store"]}
              ref={billingContain}
            >
              <h3 className={styles["billing-heading"]} onClick={toggleCheckoutTabHandler(billingRef, billingContain)}>
                Billing Info
              </h3>
              <form
                ref={billingRef}
                className={`${styles["billing-form"]} ${
                  paymentType === "card" ? styles["billing-form-card"] : styles["billing-form-in-store"]
                }`}
              >
                <label className={styles["billing-form-label"]}>Full Name: </label>
                <div className={styles["billing-form-input-wrapper"]}>
                  {!isTypingName && nameValue.length !== 0 && nameIsValid && <SuccessIcon />}
                  {!isTypingName && nameValue.length !== 0 && !nameIsValid && <FailIcon />}
                  <input
                    className={styles["billing-form-input"]}
                    type="text"
                    value={nameValue}
                    onChange={nameInputChangeHandler}
                  ></input>
                </div>
                <label className={styles["billing-form-label"]}>Phone Number: </label>
                <div className={styles["billing-form-input-wrapper"]}>
                  {!isTypingPhone && phoneValue.length !== 0 && phoneIsValid && <SuccessIcon />}
                  {!isTypingPhone && phoneValue.length !== 0 && !phoneIsValid && <FailIcon />}
                  <input
                    className={styles["billing-form-input"]}
                    type="tel"
                    value={formattedPhone}
                    onChange={phoneInputChangeHandler}
                  ></input>
                </div>
                {paymentType === "card" && (
                  <>
                    <label className={styles["billing-form-label"]}>Billing Zip:</label>
                    <div className={styles["billing-form-input-wrapper"]}>
                      {!isTypingZip && zipValue.length !== 0 && zipIsValid && <SuccessIcon />}
                      {!isTypingZip && zipValue.length !== 0 && !zipIsValid && <FailIcon />}
                      <input
                        className={styles["billing-form-input"]}
                        type="text"
                        value={formattedZip}
                        onChange={zipInputChangeHandler}
                      ></input>
                    </div>
                    <label className={styles["billing-form-label"]}>Cardholder Id: </label>
                    <input
                      className={styles["billing-form-input"]}
                      placeholder="Skip -- Please don't send me your card info"
                      disabled={true}
                      type="text"
                    ></input>
                  </>
                )}
              </form>
            </div>
          )}
          {((allInputsValidCard && paymentType === "card") || (allInputsValidInStore && paymentType === "instore")) && (
            <div className={styles["checkout-submit-btn"]}>
              {submitFailed && <div className={styles["submit-failed"]}>Something went wrong. Please try again.</div>}
              <Button
                classes="button-max-width"
                onClick={submitOrderHandler}
                isSubmitting={isSubmitting}
                submitSuccess={submitSuccess}
              >
                {!submitSuccess && (isSubmitting ? "Submitting Order..." : "Submit Order")}
                {submitSuccess && "Order Submitted!"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
