import {
  FailIcon,
  MailIcon,
  PasswordIcon,
  SuccessIcon,
} from "../UI/Icons/Icons";
import {
  CancelInput,
  EmailInput,
  PasswordInput,
  SubmitInput,
} from "./AuthFormInputs";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { authActions } from "../../store/auth";
import { useEffect, useState } from "react";
import stylesAuthForm from "./AuthForm.module.css";
import styles from "./Login.module.css";
import Modal from "../UI/Modal/Modal";
import Response from "./Response";
import validator from "validator";
import { checkoutActions } from "../../store/checkout";

export default (props) => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [response, setResponse] = useState(null);

  const emailIsValid = validator.isEmail(emailValue);
  const allInputsValid = emailIsValid;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsTypingEmail(true);
      const timer = setTimeout(() => {
        setIsTypingEmail(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [emailValue]);

  const emailChangeHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const submitLoginHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.target);

    const requestData = {};
    for (const [key, value] of formData.entries()) {
      requestData[key] = value;
    }

    const response = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      credentials: "include",
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (err) {
      console.log(err);
    }

    const message = responseData
      ? responseData.message
      : "Server Error: Please try again later!";

    if (!response.ok) {
      setResponse(message);
      setIsSubmitting(false);
    } else {
      setTimeout(async () => {
        dispatch(authActions.login());

        const { name, phone, email } = responseData.data.user;
        dispatch(
          authActions.setUserInfo({
            userName: name,
            userEmail: email,
            userPhone: phone,
          }),
        );
        dispatch(checkoutActions.checkoutAsUser());
        dispatch(uiActions.closeLogin());
      }, 300);
    }
  };

  const closeLoginHandler = () => {
    dispatch(uiActions.closeLogin());
  };

  const forgotPasswordHandler = () => {
    dispatch(uiActions.showForgotPass());
  };

  const emailVerificationHandler = () => {
    dispatch(uiActions.showEmailVer());
  };

  const signupHandler = () => {
    dispatch(uiActions.showSignup());
  };

  return (
    <Modal onClose={closeLoginHandler}>
      <div className={stylesAuthForm["auth--form-container"]}>
        {response && <Response>{response}</Response>}
        <h2 className={stylesAuthForm["auth--form-heading"]}>Sign In</h2>
        <form
          onSubmit={submitLoginHandler}
          className={stylesAuthForm["auth--form"]}
        >
          <ul className={stylesAuthForm["auth--form-list"]}>
            <li className={stylesAuthForm["auth--form-input"]}>
              {emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                <SuccessIcon />
              )}
              {!emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                <FailIcon />
              )}
              <MailIcon />
              <EmailInput value={emailValue} onChange={emailChangeHandler} />
            </li>
            <li className={stylesAuthForm["auth--form-input"]}>
              <PasswordIcon />
              <PasswordInput />
            </li>
          </ul>
          <div className={stylesAuthForm["auth--form-input"]}>
            <SubmitInput
              isSubmitting={isSubmitting}
              allInputsValid={allInputsValid}
            />
          </div>
        </form>
        <CancelInput onClick={closeLoginHandler} />
        <div className={styles["login--footer"]}>
          <div className={styles["login--link-wrapper"]}>
            <button
              className={styles["btn--footer"]}
              onClick={forgotPasswordHandler}
            >
              Forgot Password?
            </button>
            <button
              className={styles["btn--footer"]}
              onClick={emailVerificationHandler}
            >
              Email Verification?
            </button>
          </div>
          <p className={styles["create-account"]}>
            <span>Don't have an account? </span>
            <button className={styles["btn--footer"]} onClick={signupHandler}>
              Create one
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
