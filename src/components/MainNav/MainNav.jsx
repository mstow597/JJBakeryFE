import { useEffect, useRef } from "react";
import Button from "../UI/Button/Button";
import MainNavButton from "./MainNavButton";
import styles from "./MainNav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import ShoppingCart from "./ShoppingCart";
import logo from "./imgs-main-nav/logo.png";
import { authActions } from "../../store/auth";
import { SERVER_URL } from "../../env";
import { checkoutActions } from "../../store/checkout";

export default (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const showHeroHandler = () => {
    dispatch(uiActions.showHero());
  };

  const showOrderHandler = () => {
    dispatch(uiActions.showOrder());
  };

  const showTestimonialsHandler = () => {
    dispatch(uiActions.showTestimonials());
  };

  const showContactHandler = () => {
    dispatch(uiActions.showContact());
  };

  const showAccountHandler = () => {
    dispatch(uiActions.showAccount());
  };

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  };

  const showLoginHandler = () => {
    dispatch(uiActions.showLogin());
  };

  const logoutHandler = async () => {
    const response = await fetch(`${SERVER_URL}/api/v1/users/logout`, {
      credentials: "include",
    });

    if (response.ok) {
      dispatch(checkoutActions.checkoutAsGuest());
      dispatch(authActions.logout());
    }
  };

  return (
    <nav className={styles["main-nav"]}>
      <img
        onClick={showHeroHandler}
        src={logo}
        alt="JJ Bakery Logo"
        className={styles["main-nav-logo"]}
      ></img>
      <Button onClick={showOrderHandler}>Start Your Order</Button>
      <MainNavButton onClick={showTestimonialsHandler}>
        Testimonials
      </MainNavButton>
      <MainNavButton onClick={showContactHandler}>
        Contact | Location
      </MainNavButton>
      {!isLoggedIn && (
        <MainNavButton onClick={showLoginHandler}>Login | Signup</MainNavButton>
      )}
      {isLoggedIn && (
        <>
          <MainNavButton onClick={showAccountHandler}>Account</MainNavButton>
          <MainNavButton onClick={logoutHandler}>Logout</MainNavButton>
        </>
      )}
      <ShoppingCart onClick={showCartHandler} />
    </nav>
  );
};
