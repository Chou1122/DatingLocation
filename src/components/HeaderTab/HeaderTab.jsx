import React from "react";
import "./Button.css";
import { Logo } from "../Logo/Logo";

export const HeaderTab = (props) => {
  const { onSignInPress } = props;

  return (
    <div style={styles.container}>
      <div style={styles.logoWrapper}>
        <Logo />
        <p style={styles.textLogo}>CoupleSpot</p>
      </div>

      <div style={styles.btnWrapper}>
        <button className="button" onClick={onSignInPress}>
          <p style={styles.textBtn}>Sign In</p>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "60px",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "20vw",
    paddingRight: "20vw",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "#cccccc",
  },
  logoWrapper: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  logoContainer: {
    width: "40px",
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: "#34e0a1",
    justifyContent: "center",
    display: "flex",
  },
  textLogo: {
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "Roboto, sans-serif",
  },
  btnWrapper: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  textBtn: {
    lineHeight: 0,
    fontSize: "16px",
  },
};
