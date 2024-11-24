import React, { useState } from "react";
import { HeaderTab } from "../../components/HeaderTab/HeaderTab";
import { SignInPopUp } from "../../components/PopUp/SignIn/SignInPopUp";
import { SignUpPopUp } from "../../components/PopUp/SignUp/SignUpPopUp";

export const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const onSignInPress = () => {
    setOpenLogin(true);
  };

  const onExitSignInPress = () => {
    setOpenLogin(false);
  };

  const onSignUpPress = () => {
    setOpenSignUp(true);
  };

  const onExitSignUpPress = () => {
    setOpenSignUp(false);
  };

  return (
    <div style={styles.container}>
      <HeaderTab onSignInPress={onSignInPress} onSignUpPress={onSignUpPress} />
      {openLogin && (
        <SignInPopUp
          onExitPress={onExitSignInPress}
          onSignUpPress={onSignUpPress}
        />
      )}
      {openSignUp && (
        <SignUpPopUp
          onExitPress={onExitSignUpPress}
          onSignInPress={onSignInPress}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    display: "flex",
  },
};
