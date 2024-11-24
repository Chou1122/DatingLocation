import React, { useState } from "react";
import IconApp from "../../../icons/IconApp";
import { Logo } from "../../Logo/Logo";
import "../Button.css";

export const SignUpPopUp = (props) => {
  const { onExitPress, onSignInPress } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const showPassOnPress = () => {
    setShowPass(!showPass);
  };

  const onEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleJoinPress = () => {
    onExitPress();
    onSignInPress();
  };

  return (
    <div style={styles.layout}>
      <div style={styles.popupWrapper}>
        <div style={styles.btnWrapper}>
          <button className="buttonCancel" onClick={onExitPress}>
            <IconApp name="cancel" height="24" width="24" />
          </button>
        </div>

        <div style={styles.logoWrapper}>
          <Logo />
        </div>

        <div style={styles.labelWrapper}>
          <p style={styles.textLabel}>Join to unlock the best of CoupleSpot!</p>
        </div>

        <div style={styles.infoWrapper}>
          <div style={styles.infoChildWrapper}>
            <p style={styles.infoText}>First Name</p>
            <input style={styles.inputInfo} />
          </div>

          <div style={styles.infoChildWrapper}>
            <p style={styles.infoText}>Last Name</p>
            <input style={styles.inputInfo} />
          </div>
        </div>

        <div style={styles.emailWrapper}>
          <div style={styles.emailLabel}>
            <p style={styles.emailLabelText}>Email address</p>
          </div>

          <div style={styles.inputEmailWrapper}>
            <input
              style={styles.input}
              placeholder="abc@gmail.com"
              onChange={onEmailChange}
            />
          </div>
        </div>

        <div style={styles.passwordWrapper}>
          <div style={styles.passwordLabel}>
            <p style={styles.passwordLabelText}>Create a password</p>
          </div>

          <div style={styles.inputPasswordWrapper}>
            <div style={styles.inputPasswordCon}>
              <input
                style={styles.inputPassword}
                placeholder="Password"
                type={showPass ? "text" : "password"}
                onChange={onPasswordChange}
              />
              <button className={"eyePassBtn"} onClick={showPassOnPress}>
                <IconApp
                  name={showPass ? "eye-close" : "eye"}
                  height={"20px"}
                  width={"20px"}
                />
              </button>
            </div>
          </div>
        </div>

        <div style={styles.btnSignInWrapper}>
          <button className={"signInBtn"}>
            <text style={styles.textSignInBtn}>Join</text>
          </button>
        </div>

        <div style={styles.signUpLabelWrapper}>
          <div style={styles.lineThought}></div>
          <p style={styles.textSignUpLabel}>Already have an account?</p>
          <div style={styles.lineThought}></div>
        </div>

        <div style={styles.joinBtnWrapper}>
          <p style={styles.textSignUp}>
            <button
              className={"joinBtn"}
              style={styles.textSignUpBtn}
              onClick={handleJoinPress}
            >
              Sign in
            </button>
            using your CoupleSpot account.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupWrapper: {
    position: "relative",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "48px",
    paddingRight: "48px",
    paddingTop: "32px",
    paddingBottom: "32px",
    width: "fit-content",
    boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.4)",
  },

  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    backgroundColor: "red",
    boxSizing: "border-box",
  },
  infoChildWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0px",
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "0px",
  },
  inputInfo: {
    display: "flex",
    // padding: "10px",
    // fontSize: "16px",
    borderRadius: "5px",
    border: "2px solid #ccc",
    outline: "none",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  },

  infoText: {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
  },

  btnWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  logoWrapper: {
    marginTop: "16px",
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
  },
  labelWrapper: {
    marginTop: "26px",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    maxWidth: "380px",
  },
  textLabel: {
    fontSize: "26px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
  },
  emailWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "380px",
  },
  emailLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "20px",
  },
  emailLabelText: {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
  },
  inputEmailWrapper: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "2px solid #ccc",
    boxSizing: "border-box",
    outline: "none",
  },
  inputPassword: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "none",
    boxSizing: "border-box",
    outline: "none",
  },
  inputPasswordCon: {
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "5px",
    paddingRight: "8px",
  },
  passwordWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "380px",
    marginTop: "20px",
  },
  passwordLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "20px",
  },
  passwordLabelText: {
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
  },
  inputPasswordWrapper: {
    width: "100%",
  },
  forgotPassWrapper: {
    marginTop: "20px",
    display: "flex",
    width: "100%",
  },
  forgotPassText: {
    textDecoration: "underline",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Roboto, sans-serif",
  },
  btnSignInWrapper: {
    display: "flex",
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
  },
  textSignInBtn: {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "Roboto, sans-serif",
  },
  signUpLabelWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    gap: "6px",
    width: "100%",
  },
  lineThought: {
    height: "1px",
    backgroundColor: "rgb(224, 224, 224)",
    width: "25%",
  },
  textSignUpLabel: {
    color: "rgb(51, 51, 51)",
    fontSize: "14px",
    fontWeight: "300",
    fontFamily: "Roboto, sans-serif",
  },
  joinBtnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1px",
  },
  textSignUp: {
    color: "rgb(51, 51, 51)",
    fontSize: "16px",
    fontWeight: "300",
    fontFamily: "Roboto, sans-serif",
  },
  textSignUpBtn: {
    color: "rgb(51, 51, 51)",
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    textDecoration: "underline",
  },
};
