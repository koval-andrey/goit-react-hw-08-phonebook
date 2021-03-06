import React from "react";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import LoginMenu from "./login";
import UserMenu from "./UserMenu/UserMenu";
import authSelectors from "../redux/auth/auth-selectors";

import styles from "./appBar.module.css";

const AppBar = ({ isAuthenticated }) => {
  return (
    <div className={styles.appBar}>
      <Navigation />
      {!isAuthenticated ? <LoginMenu /> : <UserMenu />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
