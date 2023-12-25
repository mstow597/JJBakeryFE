import { useDispatch, useSelector } from "react-redux";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import styles from "./Account.module.css";
import { useState } from "react";
import { Information, MailIconAccount, PersonIconAccount, PhoneIconContact } from "../UI/Icons/Icons";
import Button from "../UI/Button/Button";
import { NameInput, PasswordInput, PhoneInput } from "../Auth/AuthFormInputs";
import { SERVER_URL } from "../../env";
import { useEffect } from "react";
import { authActions } from "../../store/auth";

export default () => {
  const dispatch = useDispatch();
  const { userName, userEmail, userPhone } = useSelector((state) => state.auth);
  const [activeNav, setActiveNav] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [newPasswordConfirmValue, setNewPasswordConfirmValue] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState(null);

  useEffect(() => {
    const getPurchaseHistory = async () => {
      const response = await fetch(`${SERVER_URL}/api/v1/orders/me/history`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: document.cookie.split("=")[1],
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      console.log(data);
      setPurchaseHistory(data.data.purchaseHistory);
    };
    getPurchaseHistory();
  }, []);

  const accountNavClickHandler = (selection) => {
    return () => {
      setActiveNav(selection);
    };
  };

  const nameValueChangeHandler = (event) => {
    setNameValue(event.target.value);
  };
  const phoneValueChangeHandler = (event) => {
    setPhoneValue(event.target.value);
  };
  const currentPasswordValueChangeHandler = (event) => {
    setCurrentPasswordValue(event.target.value);
  };
  const newPasswordValueChangeHandler = (event) => {
    setNewPasswordValue(event.target.value);
  };
  const newPasswordConfirmValueChangeHandler = (event) => {
    setNewPasswordConfirmValue(event.target.value);
  };

  const updateNameSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`${SERVER_URL}/api/v1/users/me/name`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: document.cookie.split("=")[1],
        name: nameValue,
      }),
    });

    const data = await response.json();

    dispatch(authActions.setUserInfo(data.data.user));

    setIsSubmitting(false);
    setNameValue("");
  };

  const updatePhoneSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await fetch(`${SERVER_URL}/api/v1/users/me/phone`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: document.cookie.split("=")[1],
        phone: phoneValue,
      }),
    });

    setIsSubmitting(false);
    setPhoneValue("");
  };

  const updatePasswordSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await fetch(`${SERVER_URL}/api/v1/users/me/password`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: document.cookie.split("=")[1],
        passwordCurrent: currentPasswordValue,
        password: newPasswordValue,
        passwordConfirm: newPasswordConfirmValue,
      }),
    });

    setIsSubmitting(false);
    setCurrentPasswordValue("");
    setNewPasswordValue("");
    setNewPasswordConfirmValue("");
  };

  return (
    <>
      <nav className={styles["account-nav"]}>
        <li onClick={accountNavClickHandler("details")} className={styles["account-nav-btn"]}>
          <div className={activeNav === "details" ? `${styles.active}` : ""}></div>
          Account Details
        </li>
        <li onClick={accountNavClickHandler("name")} className={styles["account-nav-btn"]}>
          <div className={activeNav === "name" ? `${styles.active}` : ""}></div>
          Update Name
        </li>
        <li onClick={accountNavClickHandler("phone")} className={styles["account-nav-btn"]}>
          <div className={activeNav === "phone" ? `${styles.active}` : ""}></div>
          Update Phone Number
        </li>
        <li onClick={accountNavClickHandler("password")} className={styles["account-nav-btn"]}>
          <div className={activeNav === "password" ? `${styles.active}` : ""}></div>
          Update Password
        </li>
        <li onClick={accountNavClickHandler("history")} className={styles["account-nav-btn"]}>
          <div className={activeNav === "history" ? `${styles.active}` : ""}></div>
          Order History
        </li>
      </nav>
      <SlideInWrapper>
        <div className={styles.account}>
          <div className={styles.container}>
            {activeNav === "details" && (
              <div className={styles.details}>
                <h3 className={styles.heading}>
                  <span>Account Details</span>
                  <div className={`${styles.line} ${styles["line--heading"]}`}></div>
                </h3>

                <ul className={styles["details-list"]}>
                  <li className={styles["details-list-item"]}>
                    <PersonIconAccount></PersonIconAccount>
                    <span className={styles["details-list-item-key"]}>Name</span>
                    <span className={styles["details-list-item-value"]}>{userName}</span>
                    <div className={styles.line}></div>
                  </li>
                  <li className={styles["details-list-item"]}>
                    <PhoneIconContact></PhoneIconContact>
                    <span className={styles["details-list-item-key"]}>Phone</span>
                    <span className={styles["details-list-item-value"]}>{userPhone}</span>
                    <div className={styles.line}></div>
                  </li>
                  <li className={styles["details-list-item"]}>
                    <MailIconAccount></MailIconAccount>
                    <span className={styles["details-list-item-key"]}>Email</span>
                    <span className={styles["details-list-item-value"]}>{userEmail}</span>
                    <div className={styles.line}></div>
                  </li>
                </ul>
              </div>
            )}
            {activeNav === "name" && (
              <div className={styles.name}>
                <h3 className={styles.heading}>
                  <span>Update Your Name</span>
                  <div className={`${styles.line} ${styles["line--heading"]} `}></div>
                </h3>
                <form className={styles.form} onSubmit={updateNameSubmitHandler}>
                  <NameInput value={nameValue} onChange={nameValueChangeHandler}></NameInput>
                  <Button isSubmitting={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </form>
              </div>
            )}

            {activeNav === "phone" && (
              <div className={styles.phone}>
                <h3 className={styles.heading}>
                  <span>Update Your Phone Number</span>
                  <div className={`${styles.line} ${styles["line--heading"]}`}></div>
                </h3>
                <form className={styles.form} onSubmit={updatePhoneSubmitHandler}>
                  <PhoneInput value={phoneValue} onChange={phoneValueChangeHandler}></PhoneInput>
                  <Button isSubmitting={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </form>
              </div>
            )}
            {activeNav === "password" && (
              <div className={styles.password}>
                <h3 className={styles.heading}>
                  <span>Update Your Password</span>
                  <div className={`${styles.line} ${styles["line--heading"]} `}></div>
                </h3>
                <form className={styles.form} onSubmit={updatePasswordSubmitHandler}>
                  <PasswordInput
                    placeholder={"Current Password"}
                    value={currentPasswordValue}
                    onChange={currentPasswordValueChangeHandler}
                  ></PasswordInput>
                  <PasswordInput
                    placeholder={"New Password"}
                    value={newPasswordValue}
                    onChange={newPasswordValueChangeHandler}
                  ></PasswordInput>
                  <PasswordInput
                    placeholder={"New Password Confirmation"}
                    value={newPasswordConfirmValue}
                    onChange={newPasswordConfirmValueChangeHandler}
                  ></PasswordInput>
                  <Button isSubmitting={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                </form>
              </div>
            )}
            {activeNav === "history" && (
              <div className={styles.history}>
                <h3 className={styles.heading}>
                  <span>Order History</span>
                  <div className={`${styles.line} ${styles["line--heading"]}`}></div>
                </h3>

                <ul className={styles["history-list"]}>
                  <div className={styles["history-headings-container"]}>
                    <h4 className={styles["history-list-heading"]}>Order Number</h4>
                    <h4 className={styles["history-list-heading"]}>Order Date</h4>
                    <h4 className={styles["history-list-heading"]}>Order Price</h4>
                    <h4 className={styles["history-list-heading"]}>Order Status</h4>
                  </div>
                  {purchaseHistory &&
                    purchaseHistory.map((purchase) => {
                      console.log(purchase);
                      return (
                        <li key={purchase._id} className={styles["history-list-item"]}>
                          <span className={styles["history-list-item-purchase-id"]}>{purchase._id}</span>
                          <span className={styles["history-list-item-purchase-date"]}>
                            {new Date(purchase.purchaseDate).toDateString()}
                          </span>
                          <span className={styles["history-list-item-purchase-price"]}>
                            ${purchase.purchasePrice.toFixed(2)}
                          </span>
                          <span className={styles["history-list-item-purchase-status"]}>
                            {purchase.orderPaid ? "Paid" : "In Process"}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </SlideInWrapper>
    </>
  );
};
