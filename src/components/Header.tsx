import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "../styles/HeaderStyle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo1.png";
import { useProductContext } from "../context/ProductContext";
import ProductService from "../services/product.service";
import { useToast } from "../context/ToastContext";
import type { Product } from "../models/IProduct";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setProducts, setLoading, refreshProducts } = useProductContext();
  const { showToast } = useToast();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchSearchedProducts(searchQuery);
      } else {
        // Optionally, fetch all products again if input is cleared
       refreshProducts();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // CALL SEARCH QUERY
  const fetchSearchedProducts = async (value: any) => {
    setLoading(true);
    try {
      const productData = await ProductService.getProductsBySearch(value);
      if (productData.products) {
        const transformData = productData.products.map(
          ({ id, title, price, thumbnail, brand, category, description, rating, stock }: Product) => ({
            id,
            title,
            price,
            thumbnail,
            brand,
            category,
            description,
            rating,
            stock,
            quantity: 1,
          })
        );
        setProducts(transformData);
        showToast("Products loaded successfully!", "success");
      }
    } catch (e) {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

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
          <NavLink to="/cart" className="logo">
            <ShoppingCartOutlinedIcon />
          </NavLink>
        </section>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;
