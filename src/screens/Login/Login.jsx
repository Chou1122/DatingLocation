import React, { useState } from "react";
import { HeaderTab } from "../../components/HeaderTab/HeaderTab";

export const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const onSignInPress = () => {
    setOpenLogin(true);
  };

  return (
    <div style={styles.container}>
      <HeaderTab onSignInPress={onSignInPress} />
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
