import React, { useEffect, useState } from "react";
import { Slider, Stack,Rating, FormGroup,FormControlLabel, Checkbox} from "@mui/material";
import ProductService from "../services/product.service";
import { useToast } from "../context/ToastContext";
import type { Product } from "../models/IProduct";
import { useProductContext } from "../context/ProductContext";

const Sidebar = () => {
 const [priceFilter, setpriceFilter] = useState("");
  const { setProducts, setLoading, refreshProducts } = useProductContext();
  const { showToast } = useToast();
 useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (priceFilter.trim() !== "") {
        fetchPriceFilteredProducts(priceFilter);
      } else {
       refreshProducts();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [priceFilter]);

const [value, setValue] =  React.useState([0,100]);
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };

   // CALL PRICE FILTER FUNCTION
  const fetchPriceFilteredProducts = async (value: any) => {
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
    <>
    <div>Price Range</div>
    <div>
      <Slider
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      Your range of Price is between ₹{value[0]} and ₹{value[1]}
    </div>

    <div>Customer Rating</div>
    <Stack>
      <Rating name="half-rating" defaultValue={0} precision={0.5}/>&Up
    </Stack>

     <div>Category</div>
    <FormGroup>
      <FormControlLabel control={<Checkbox/>} label='Beauty'/>
      <FormControlLabel control={<Checkbox/>} label='Groceries'/>
      <FormControlLabel control={<Checkbox/>} label='Furniture'/>
      </FormGroup>
    </>
  )
}

export default Sidebar