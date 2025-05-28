import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "../styles/HeaderStyle";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderWrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;
