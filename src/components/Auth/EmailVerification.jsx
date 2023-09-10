import validator from 'validator';
import { useState, useEffect } from 'react';
import { SERVER_URL } from '../../env';
import { uiActions } from '../../store/ui';
import Modal from '../UI/Modal/Modal';
import { useDispatch } from 'react-redux';
import stylesAuthForm from './AuthForm.module.css';
import { FailIcon, MailIcon, SuccessIcon } from '../UI/Icons/Icons';
import { CancelInput, EmailInput, SubmitInput } from './AuthFormInputs';

export default (props) => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState();
  const [emailValue, setEmailValue] = useState('');
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const emailVerCloseHandler = () => {
    dispatch(uiActions.closeEmailVer());
  };

  const submitEmailVerificationHandler = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.target);

    const requestData = {};

    for (const [key, value] of formData.entries()) {
      requestData[key] = value;
    }

    const response = await fetch(`${SERVER_URL}/api/v1/users/sendEmailVerification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (err) {
      console.log(err);
    }

    const message = responseData ? responseData.message : 'Server Error: Please try again later!';

    if (!response.ok) {
      setResponse(message);
      setIsSubmitting(false);
    } else {
      setResponse(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal onClose={emailVerCloseHandler}>
        <div className={stylesAuthForm['auth--form-container']}>
          {response && <Response>{response}</Response>}
          <h2 className={stylesAuthForm['auth--form-heading']}>Resend Email Verification</h2>
          <form onSubmit={submitEmailVerificationHandler} className={stylesAuthForm['auth--form']}>
            <ul className={stylesAuthForm['auth--form-list']}>
              <li className={stylesAuthForm['auth--form-input']}>
                {!emailIsValid && emailValue.length !== 0 && !isTypingEmail && <FailIcon />}
                {emailIsValid && emailValue.length !== 0 && !isTypingEmail && <SuccessIcon />}
                <MailIcon />
                <EmailInput value={emailValue} onChange={emailChangeHandler}></EmailInput>
              </li>
            </ul>
            <div className={stylesAuthForm['auth--form-input']}>
              <SubmitInput isSubmitting={isSubmitting} allInputsValid={allInputsValid} />
            </div>
          </form>
          <CancelInput onClick={emailVerCloseHandler} />
        </div>
      </Modal>
    </div>
  );
};
