import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "../styles/HeaderStyle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from '../assets/logo1.png'

const Header = () => {
  return (
    <React.Fragment>
      <HeaderWrapper>
        <section className="left-section">
          <NavLink to="/" className="logo">
            <section>
              <img src={logo} alt="Logo" />
            </section>
          </NavLink>
        </section>
        <section className="cetner-section">
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            sx={{borderRadius: "4px" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </section>
        <section className="right-section">
          <NavLink to="/cart" className="logo">
            <ShoppingCartOutlinedIcon />
          </NavLink>
        </section>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;
