import { useSelector } from "react-redux";
import MainNav from "./components/MainNav/MainNav";
import Hero from "./components/Hero/Hero";
import Cart from "./components/Cart/Cart";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EmailVerification from "./components/Auth/EmailVerification";
import Order from "./components/Order/Order";
import Checkout from "./components/Cart/Checkout";
import OrderExceeded from "./components/Order/OrderExceeded";
import Setup from "./components/Setup/Setup";
import Receipt from "./components/Cart/Receipt";
import Testimonials from "./components/Testimonials/Testimonials";
import OrderItemAddedSuccess from "./components/Order/OrderItemAddedSuccess";
import Contact from "./components/Contact/Contact";
import ContactSuccess from "./components/Contact/ContactSuccess";
import SignupSuccess from "./components/Auth/SignupSuccess";
import Account from "./components/Account/Account";

export default () => {
  const {
    showLoginModal,
    showSignupModal,
    showSignupSuccessModal,
    showCartModal,
    showForgotPassModal,
    showEmailVerModal,
    showSectionHero,
    showSectionOrder,
    showCheckoutModal,
    showReceiptModal,
    showItemAddedSuccess,
    showOrderLimitExceededModal,
    showSectionTestimonials,
    showSectionContact,
    showSectionAccount,
    showContactSuccessModal,
  } = useSelector((state) => state.ui);

  return (
    <div className="container">
      <Setup />
      <MainNav />
      {showCartModal && <Cart />}
      {showCheckoutModal && <Checkout />}
      {showReceiptModal && <Receipt />}
      {showLoginModal && <Login />}
      {showSignupModal && <Signup />}
      {showSignupSuccessModal && <SignupSuccess />}
      {showForgotPassModal && <ForgotPassword />}
      {showEmailVerModal && <EmailVerification />}
      {showSectionHero && <Hero />}
      {showSectionOrder && <Order />}
      {showSectionTestimonials && <Testimonials />}
      {showSectionContact && <Contact />}
      {showContactSuccessModal && <ContactSuccess />}
      {showSectionAccount && <Account />}
      {showItemAddedSuccess && <OrderItemAddedSuccess />}
      {showOrderLimitExceededModal && <OrderExceeded />}
    </div>
  );
};
