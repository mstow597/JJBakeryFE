import Modal from "../UI/Modal/Modal";
import stylesAuthForm from "./AuthForm.module.css";
import styles from "./Signup.module.css";
import validator from "validator";
import { SERVER_URL } from "../../env";
import {
  FailIcon,
  MailIcon,
  PasswordIcon,
  PersonIcon,
  PhoneIcon,
  SuccessIcon,
} from "../UI/Icons/Icons";
import {
  CancelInput,
  EmailConfirmInput,
  EmailInput,
  NameInput,
  PasswordConfirmInput,
  PasswordInput,
  PhoneInput,
  SubmitInput,
} from "./AuthFormInputs";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { useEffect, useState } from "react";
import Response from "./Response";

const PasswordDetailModal = (props) => {
  const { passwordValue } = props;
  return (
    <div className={styles["detail-modal"]}>
      <div className={styles["detail-modal-container"]}>
        <div className={styles["detail-modal-row"]}>
          <p>At least 8 characters in length</p>
          {passwordValue.length < 8 && <FailIcon />}
          {passwordValue.length >= 8 && <SuccessIcon />}
        </div>
        <div className={styles["detail-modal-row"]}>
          <p>At least 1 lowercase</p>
          {!/[a-z]/.test(passwordValue) && <FailIcon />}
          {/[a-z]/.test(passwordValue) && <SuccessIcon />}
        </div>
        <div className={styles["detail-modal-row"]}>
          <p>At least 1 uppercase</p>
          {!/[A-Z]/.test(passwordValue) && <FailIcon />}
          {/[A-Z]/.test(passwordValue) && <SuccessIcon />}
        </div>
        <div className={styles["detail-modal-row"]}>
          <p>At least 1 number</p>
          {!/[0-9]/.test(passwordValue) && <FailIcon />}
          {/[0-9]/.test(passwordValue) && <SuccessIcon />}
        </div>
        <div className={styles["detail-modal-row"]}>
          <p>At least 1 symbol (!,#,@, etc.)</p>
          {!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue) && (
            <FailIcon />
          )}
          {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue) && (
            <SuccessIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default (props) => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailConfirmValue, setEmailConfirmValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");

  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingPhone, setIsTypingPhone] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingEmailConfirm, setIsTypingEmailConfirm] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isTypingPasswordConfirm, setIsTypingPasswordConfirm] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const nameIsValid = validator.isAscii(nameValue);
  const phoneIsValid = phoneValue.match(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?$/,
  );
  const emailIsValid = validator.isEmail(emailValue);
  const emailConfirmIsValid = emailValue === emailConfirmValue;
  const passwordIsValid = validator.isStrongPassword(passwordValue);
  const passwordConfirmIsValid = passwordConfirmValue === passwordValue;

  const canSubmit =
    nameIsValid &&
    nameValue.length > 0 &&
    phoneIsValid &&
    phoneValue.length > 0 &&
    emailIsValid &&
    emailValue.length > 0 &&
    emailConfirmIsValid &&
    emailConfirmValue.length > 0 &&
    passwordIsValid &&
    passwordValue.length > 0 &&
    passwordConfirmIsValid &&
    passwordConfirmValue.length > 0;

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
      setIsTypingEmail(true);
      const timer = setTimeout(() => {
        setIsTypingEmail(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [emailValue]);

  useEffect(() => {
    if (isMounted) {
      setIsTypingEmailConfirm(true);
      const timer = setTimeout(() => {
        setIsTypingEmailConfirm(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [emailConfirmValue]);

  useEffect(() => {
    if (isMounted) {
      setIsTypingPassword(true);
      const timer = setTimeout(() => {
        setIsTypingPassword(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [passwordValue]);

  useEffect(() => {
    if (isMounted) {
      setIsTypingPasswordConfirm(true);
      const timer = setTimeout(() => {
        setIsTypingPasswordConfirm(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [passwordConfirmValue]);

  const closeSignupHandler = () => {
    dispatch(uiActions.closeSignup());
  };

  const nameChangeHandler = (event) => {
    setNameValue(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhoneValue(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const emailConfirmChangeHandler = (event) => {
    setEmailConfirmValue(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const passwordConfirmChangeHandler = (event) => {
    setPasswordConfirmValue(event.target.value);
  };

  const onFocusPasswordHandler = () => {
    setPasswordIsFocused(true);
  };

  const onBlurPasswordHandler = () => {
    setPasswordIsFocused(false);
  };

  const submitSignupHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.target);

    const requestData = {};
    for (const [key, value] of formData.entries()) {
      requestData[key] = value;
    }

    const response = await fetch(`${SERVER_URL}/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
      dispatch(uiActions.showSignupSuccess());
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal onClose={closeSignupHandler}>
        <div className={stylesAuthForm["auth--form-container"]}>
          {response && <Response>{response}</Response>}
          <h2 className={stylesAuthForm["auth--form-heading"]}>Sign up</h2>
          <form
            className={stylesAuthForm["auth--form"]}
            onSubmit={submitSignupHandler}
          >
            <ul className={stylesAuthForm["auth--form-list"]}>
              <li className={stylesAuthForm["auth--form-input"]}>
                {!nameIsValid && nameValue.length !== 0 && !isTypingName && (
                  <FailIcon />
                )}
                {nameIsValid && nameValue.length !== 0 && !isTypingName && (
                  <SuccessIcon />
                )}
                <PersonIcon />
                <NameInput
                  value={nameValue}
                  onChange={nameChangeHandler}
                ></NameInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                {!phoneIsValid && phoneValue.length !== 0 && !isTypingPhone && (
                  <FailIcon />
                )}
                {phoneIsValid && phoneValue.length !== 0 && !isTypingPhone && (
                  <SuccessIcon />
                )}
                <PhoneIcon />
                <PhoneInput
                  value={phoneValue}
                  onChange={phoneChangeHandler}
                ></PhoneInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                {!emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                  <FailIcon />
                )}
                {emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                  <SuccessIcon />
                )}
                <MailIcon />
                <EmailInput
                  value={emailValue}
                  onChange={emailChangeHandler}
                ></EmailInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                {!emailConfirmIsValid &&
                  emailConfirmValue.length !== 0 &&
                  !isTypingEmailConfirm && <FailIcon />}
                {emailConfirmIsValid &&
                  emailConfirmValue.length !== 0 &&
                  !isTypingEmailConfirm && <SuccessIcon />}
                <MailIcon />
                <EmailConfirmInput
                  value={emailConfirmValue}
                  onChange={emailConfirmChangeHandler}
                ></EmailConfirmInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                {passwordIsFocused && (
                  <PasswordDetailModal passwordValue={passwordValue} />
                )}
                {!passwordIsValid &&
                  passwordValue.length !== 0 &&
                  !isTypingPassword && <FailIcon />}
                {passwordIsValid &&
                  passwordValue.length !== 0 &&
                  !isTypingPassword && <SuccessIcon />}
                <PasswordIcon />
                <PasswordInput
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  onFocus={onFocusPasswordHandler}
                  onBlur={onBlurPasswordHandler}
                ></PasswordInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                {!passwordConfirmIsValid &&
                  passwordConfirmValue.length !== 0 &&
                  !isTypingPasswordConfirm && <FailIcon />}
                {passwordConfirmIsValid &&
                  passwordConfirmValue.length !== 0 &&
                  !isTypingPasswordConfirm && <SuccessIcon />}
                <PasswordIcon />
                <PasswordConfirmInput
                  value={passwordConfirmValue}
                  onChange={passwordConfirmChangeHandler}
                ></PasswordConfirmInput>
              </li>
              <li className={stylesAuthForm["auth--form-input"]}>
                <SubmitInput
                  isSubmitting={isSubmitting}
                  allInputsValid={canSubmit}
                ></SubmitInput>
              </li>
            </ul>
          </form>
          <CancelInput onClick={closeSignupHandler}></CancelInput>
        </div>
      </Modal>
    </div>
  );
};
