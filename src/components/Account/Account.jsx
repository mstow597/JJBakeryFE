import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import styles from "./Account.module.css";
import { useState } from "react";
import {
  MailIcon,
  MailIconAccount,
  PersonIcon,
  PersonIconAccount,
  PhoneIcon,
  PhoneIconContact,
} from "../UI/Icons/Icons";
import Button from "../UI/Button/Button";
import { NameInput, PhoneInput } from "../Auth/AuthFormInputs";

export default () => {
  const { userName, userEmail, userPhone } = useSelector((state) => state.auth);

  const [activeNav, setActiveNav] = useState("details");

  const accountNavClickHandler = (selection) => {
    return () => {
      setActiveNav(selection);
    };
  };

  return (
    <>
      <nav className={styles["account-nav"]}>
        <li
          onClick={accountNavClickHandler("details")}
          className={styles["account-nav-btn"]}
        >
          <div
            className={activeNav === "details" ? `${styles.active}` : ""}
          ></div>
          Account Details
        </li>
        <li
          onClick={accountNavClickHandler("name")}
          className={styles["account-nav-btn"]}
        >
          <div className={activeNav === "name" ? `${styles.active}` : ""}></div>
          Update Name
        </li>
        <li
          onClick={accountNavClickHandler("phone")}
          className={styles["account-nav-btn"]}
        >
          <div
            className={activeNav === "phone" ? `${styles.active}` : ""}
          ></div>
          Update Phone Number
        </li>
        <li
          onClick={accountNavClickHandler("password")}
          className={styles["account-nav-btn"]}
        >
          <div
            className={activeNav === "password" ? `${styles.active}` : ""}
          ></div>
          Update Password
        </li>
        <li
          onClick={accountNavClickHandler("payment")}
          className={styles["account-nav-btn"]}
        >
          <div
            className={activeNav === "payment" ? `${styles.active}` : ""}
          ></div>
          Payment Methods
        </li>
        <li
          onClick={accountNavClickHandler("history")}
          className={styles["account-nav-btn"]}
        >
          <div
            className={activeNav === "history" ? `${styles.active}` : ""}
          ></div>
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
                  <div
                    className={`${styles.line} ${styles["line--heading"]}`}
                  ></div>
                </h3>

                <ul className={styles["details-list"]}>
                  <li className={styles["details-list-item"]}>
                    <PersonIconAccount></PersonIconAccount>
                    <span className={styles["details-list-item-key"]}>
                      Name
                    </span>
                    <span className={styles["details-list-item-value"]}>
                      {userName}
                    </span>
                    <div className={styles.line}></div>
                  </li>
                  <li className={styles["details-list-item"]}>
                    <PhoneIconContact></PhoneIconContact>
                    <span className={styles["details-list-item-key"]}>
                      Phone
                    </span>
                    <span className={styles["details-list-item-value"]}>
                      {userPhone}
                    </span>
                    <div className={styles.line}></div>
                  </li>
                  <li className={styles["details-list-item"]}>
                    <MailIconAccount></MailIconAccount>
                    <span className={styles["details-list-item-key"]}>
                      Email
                    </span>
                    <span className={styles["details-list-item-value"]}>
                      {userEmail}
                    </span>
                    <div className={styles.line}></div>
                  </li>
                </ul>
              </div>
            )}
            {activeNav === "name" && (
              <div className={styles.name}>
                <h3 className={styles.heading}>
                  <span>Update Account Name</span>
                  <div
                    className={`${styles.line} ${styles["line--heading"]} `}
                  ></div>
                </h3>
                <form className={styles.form}>
                  <NameInput></NameInput>
                  <Button>Submit</Button>
                </form>
              </div>
            )}

            {activeNav === "phone" && (
              <div>
                <h3 className={styles.heading}>
                  <span>Update Phone Number</span>
                  <div
                    className={`${styles.line} ${styles["line--heading"]}`}
                  ></div>
                </h3>
                <form className={styles.form}>
                  <PhoneInput></PhoneInput>
                  <Button>Submit</Button>
                </form>
              </div>
            )}
            {activeNav === "password" && <div></div>}
            {activeNav === "payment" && <div></div>}
            {activeNav === "history" && <div></div>}
          </div>
        </div>
      </SlideInWrapper>
    </>
  );
};
