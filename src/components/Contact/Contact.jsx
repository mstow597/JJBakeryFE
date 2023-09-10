import { useEffect, useState } from "react";
import {
  EmailInput,
  NameInput,
  PhoneInput,
  SubmitInput,
} from "../Auth/AuthFormInputs";
import {
  Clock,
  FailIcon,
  HomeIcon,
  MailIcon,
  MessageIcon,
  PersonIcon,
  PhoneIcon,
  PhoneIconContact,
  SuccessIcon,
} from "../UI/Icons/Icons";
import SlideInWrapper from "../Utils/SlideInWrapper/SlideInWrapper";
import styles from "./Contact.module.css";
import validator from "validator";
import { uiActions } from "../../store/ui";
import { useDispatch } from "react-redux";

const formattedPhoneValue = (phone) => {
  if (phone.length <= 3) return phone;
  if (phone.length >= 4 && phone.length < 6)
    return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  if (phone.length >= 6 && phone.length <= 10)
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}${
      phone.length > 6 ? ` - ${phone.slice(6)}` : ""
    }`;
  if (phone.length > 10)
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)} - ${phone.slice(
      6,
      10,
    )}`;
};

const filterPhone = (phone) => {
  return phone.replaceAll(/[^0-9]/g, "");
};

export default () => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [isTypingName, setIsTypingName] = useState(false);
  const [isTypingPhone, setIsTypingPhone] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);

  const filteredPhone = filterPhone(phoneValue);
  const formattedPhone = formattedPhoneValue(filteredPhone);

  const phoneIsValid = /^\(?(\d{3})\)?[- ]?(\d{3})(\ -\ )?(\d{4})$/.test(
    formattedPhone,
  );
  const nameIsValid = validator.isAscii(nameValue);
  const emailIsValid = validator.isEmail(emailValue);
  const messageIsValid = messageValue.length > 0;
  const allInputsValid =
    nameIsValid && phoneIsValid && emailIsValid && messageIsValid;

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
      setIsTypingMessage(true);
      const timer = setTimeout(() => {
        setIsTypingMessage(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageValue]);

  const nameChangeHandler = (event) => {
    setNameValue(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhoneValue(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const messageChangeHandler = (event) => {
    setMessageValue(event.target.value);
  };

  const contactFormSubmitHandler = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      setEmailValue("");
      setNameValue("");
      setPhoneValue("");
      setMessageValue("");
      setIsSubmitting(false);
      dispatch(uiActions.showContactSuccess());
    }, 2000);
  };

  return (
    <SlideInWrapper>
      <div className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.business}>
            <div className={styles.address}>
              <HomeIcon />
              <div className={styles.text}>
                <h3 className={styles.heading}>Address</h3>
                <span>1234 Timbuktu Rd, Nowhere, USA</span>
                <div className={styles.line}></div>
              </div>
            </div>
            <div className={styles.phone}>
              <PhoneIconContact />
              <div className={styles.text}>
                <h3 className={styles.heading}>Phone Number</h3>
                <span>(555) 123-4567</span>
                <div className={styles.line}></div>
              </div>
            </div>
            <div className={styles.hours}>
              <Clock />
              <div className={styles.text}>
                <h3 className={styles.heading}>Hours of Operation</h3>
                <span>Monday-Saturday 8am-8pm </span>
                <div className={styles.line}></div>
              </div>
            </div>
          </div>
          <form onSubmit={contactFormSubmitHandler} className={styles.form}>
            <h2 className={styles["form-heading"]}>Your Order, Your Event</h2>
            <div className={styles["line-form"]}></div>
            <div className={styles["form-description"]}>
              <p>
                Have something on your mind? We're all ears! Whether it's a
                question about your bakery order or you're thinking of hosting
                an event, feel free to reach out to us using the form below.
              </p>
            </div>

            <div className={styles["form-inputs-container"]}>
              <div className={styles["form-input"]}>
                {!nameIsValid && nameValue.length !== 0 && !isTypingName && (
                  <FailIcon />
                )}
                {nameIsValid && nameValue.length !== 0 && !isTypingName && (
                  <SuccessIcon />
                )}
                <PersonIcon></PersonIcon>
                <NameInput
                  value={nameValue}
                  onChange={nameChangeHandler}
                ></NameInput>
              </div>
              <div className={styles["form-input"]}>
                {!phoneIsValid && phoneValue.length !== 0 && !isTypingPhone && (
                  <FailIcon />
                )}
                {phoneIsValid && phoneValue.length !== 0 && !isTypingPhone && (
                  <SuccessIcon />
                )}
                <PhoneIcon></PhoneIcon>
                <PhoneInput
                  value={formattedPhone}
                  onChange={phoneChangeHandler}
                ></PhoneInput>
              </div>
              <div className={styles["form-input"]}>
                {!emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                  <FailIcon />
                )}
                {emailIsValid && emailValue.length !== 0 && !isTypingEmail && (
                  <SuccessIcon />
                )}
                <MailIcon></MailIcon>
                <EmailInput
                  value={emailValue}
                  onChange={emailChangeHandler}
                ></EmailInput>
              </div>
              <div className={styles["form-input"]}>
                {!messageIsValid &&
                  messageValue.length !== 0 &&
                  !isTypingMessage && <FailIcon />}
                {messageIsValid &&
                  messageValue.length !== 0 &&
                  !isTypingMessage && <SuccessIcon />}
                <MessageIcon></MessageIcon>
                <textarea
                  className={styles.message}
                  value={messageValue}
                  onChange={messageChangeHandler}
                />
              </div>
            </div>
            <SubmitInput
              allInputsValid={allInputsValid}
              isSubmitting={isSubmitting}
            ></SubmitInput>
          </form>
        </div>
      </div>
    </SlideInWrapper>
  );
};
