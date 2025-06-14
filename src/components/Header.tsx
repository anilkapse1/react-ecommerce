import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "../styles/HeaderStyle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TextField from "@mui/material/TextField";
import { InputAdornment, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo1.png";
import { useProductContext } from "../context/ProductContext";
import { ROUTE_CONFIG } from "../constant/routes";
import { useCart } from "../context/CartContext";
import { useFilter } from "../context/FilterContext";

const Header = () => {
  const { refreshProducts, searchProducts } = useProductContext();
  const { searchQuery, setSearchQuery } = useFilter();
  const { getCartItemsCount } = useCart();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        searchProducts(searchQuery);
      } else {
        // Optionally, fetch all products again if input is cleared
        refreshProducts();
      }
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // CALL SEARCH QUERY

  return (
    <React.Fragment>
      <HeaderWrapper className="common_padding">
        <section className="left-section">
          <NavLink to="" className="logo">
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
            sx={{ borderRadius: "4px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <NavLink to={ROUTE_CONFIG.Routes.Cart.path} className="logo">
            <Badge badgeContent={getCartItemsCount()} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </NavLink>
        </section>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default React.memo(Header);
