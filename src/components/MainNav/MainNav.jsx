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
import { Menu } from "../UI/Icons/Icons";
import { useState } from "react";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";

export default (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [showMenu, setShowState] = useState(false);

  const toggleMenuHandler = () => {
    setShowState((prev) => !prev);
  };

  const showHeroHandler = () => {
    dispatch(uiActions.showHero());
  };

  const showHeroHandlerMenu = () => {
    dispatch(uiActions.showHero());
    toggleMenuHandler();
  };

  const showOrderHandler = () => {
    dispatch(uiActions.showOrder());
    toggleMenuHandler();
  };

  const showTestimonialsHandler = () => {
    dispatch(uiActions.showTestimonials());
    toggleMenuHandler();
  };

  const showContactHandler = () => {
    dispatch(uiActions.showContact());
    toggleMenuHandler();
  };

  const showAccountHandler = () => {
    dispatch(uiActions.showAccount());
    toggleMenuHandler();
  };

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
    toggleMenuHandler();
  };

  const showLoginHandler = () => {
    dispatch(uiActions.showLogin());
    toggleMenuHandler();
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
    <>
      {isMobile && (
        <>
          <nav className={styles["main-nav--mobile"]}>
            <img onClick={showHeroHandler} src={logo} alt="JJ Bakery Logo" className={styles["main-nav-logo"]}></img>
            <Menu onClick={toggleMenuHandler}></Menu>
          </nav>
          {showMenu && (
            <>
              <div className={styles["main-nav-menu-icon"]}>
                <Menu onClick={toggleMenuHandler}></Menu>
              </div>
              <nav className={styles.menu}>
                <img
                  onClick={showHeroHandlerMenu}
                  src={logo}
                  alt="JJ Bakery Logo"
                  className={styles["main-nav-logo"]}
                ></img>
                <Button onClick={showOrderHandler}>Start Your Order</Button>
                <MainNavButton onClick={showTestimonialsHandler}>Testimonials</MainNavButton>
                <MainNavButton onClick={showContactHandler}>Contact | Location</MainNavButton>
                {!isLoggedIn && <MainNavButton onClick={showLoginHandler}>Login | Signup</MainNavButton>}
                {isLoggedIn && (
                  <>
                    <MainNavButton onClick={showAccountHandler}>Account</MainNavButton>
                    <MainNavButton onClick={logoutHandler}>Logout</MainNavButton>
                  </>
                )}
                <ShoppingCart onClick={showCartHandler} />
              </nav>
            </>
          )}
        </>
      )}
      {!isMobile && (
        <nav className={styles["main-nav"]}>
          <img onClick={showHeroHandler} src={logo} alt="JJ Bakery Logo" className={styles["main-nav-logo"]}></img>
          <Button onClick={showOrderHandler}>Start Your Order</Button>
          <MainNavButton onClick={showTestimonialsHandler}>Testimonials</MainNavButton>
          <MainNavButton onClick={showContactHandler}>Contact | Location</MainNavButton>
          {!isLoggedIn && <MainNavButton onClick={showLoginHandler}>Login | Signup</MainNavButton>}
          {isLoggedIn && (
            <>
              <MainNavButton onClick={showAccountHandler}>Account</MainNavButton>
              <MainNavButton onClick={logoutHandler}>Logout</MainNavButton>
            </>
          )}
          <ShoppingCart onClick={showCartHandler} />
        </nav>
      )}
    </>
  );
};
