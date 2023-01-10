import classes from "./CartForm.module.css";

import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CartForm = (props) => {
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    postal: true,
    city: true,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredAddressIsValid,
      address: enteredAddressIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    const submitBody = {
         name: enteredName,
      address: enteredAddress,
      postal: enteredPostal,
      city: enteredCity
    };

    props.onConfirm(submitBody);


    


    nameInputRef.current.value = '';
    addressInputRef.current.value = "";
    postalInputRef.current.value = "";
    cityInputRef.current.value = "";

    
  };

  const nameClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;


  const addressClasses = `${classes.control} ${
    formInputsValidity.address ? "" : classes.invalid
  }`;


  const postalClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;


  const cityClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>Give a correct name</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef}></input>
        {!formInputsValidity.address && <p>Give a correct address</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
        {!formInputsValidity.postal && <p>Give a correct postal code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>Give a correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CartForm;
