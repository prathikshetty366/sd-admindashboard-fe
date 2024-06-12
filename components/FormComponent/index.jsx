import React from "react";
import styles from "./FormComponent.module.scss";
import Input from "../Input";
import Checkbox from "../Checkbox";
import RadioButton from "../RadioButton";
import Dropdown from "../Dropdown";
import Card from "../Card";
import Form from "../Form";

const FormComponent = () => {
  const dropdownOptions = [
    { value: "", label: "Select an option" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardSwitch}>
        <label className={styles.switch}>
          <input type="checkbox" className={styles.toggle} />
          <span className={styles.slider}></span>
          <span className={styles.cardSide}></span>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
              <Card>
                <div className={styles.title}>Log in</div>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Input type="email" name="email" placeholder="Email" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <button className={styles.flipCardBtn} type="submit">
                    Let`s go!
                  </button>
                </Form>
              </Card>
            </div>
            <div className={styles.flipCardBack}>
              <Card>
                <div className={styles.title}>Sign up</div>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Input type="text" name="name" placeholder="Name" />
                  <Input type="email" name="email" placeholder="Email" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <Checkbox name="terms" label="I agree to the terms" />
                  <RadioButton name="gender" value="male" label="Male" />
                  <RadioButton name="gender" value="female" label="Female" />
                  <Dropdown options={dropdownOptions} name="options" />
                  <button className={styles.flipCardBtn} type="submit">
                    Confirm!
                  </button>
                </Form>
              </Card>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FormComponent;
