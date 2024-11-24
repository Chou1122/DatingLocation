import React from "react";
import IconApp from "../../icons/IconApp";

export const Logo = () => {
  return (
    <div style={styles.logoContainer}>
      <IconApp name="logo" height="40px" width="40px" />
    </div>
  );
};

const styles = {
  logoContainer: {
    width: "40px",
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: "#34e0a1",
    justifyContent: "center",
    display: "flex",
  },
};
