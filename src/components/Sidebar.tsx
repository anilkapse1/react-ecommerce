import React, { useEffect, useState } from "react";
import {
  Slider,
  Stack,
  Rating,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import ProductService from "../services/product.service";
import { useToast } from "../context/ToastContext";
import { useProductContext } from "../context/ProductContext";
import type { Product } from "../models/IProduct";

const Sidebar: React.FC = () => {
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);
  const { setProducts, setLoading, refreshProducts } = useProductContext();
  const { showToast } = useToast();

  // Handle slider changes
  const handleSliderChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    console.log('event:', event);
    const value = Array.isArray(newValue) ? newValue : [newValue, 100];
    setSliderValue(value);
    setPriceFilter(`${value[0]}-${value[1]}`);
  };

  // Debounced fetch on price filter change
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

  // Fetch filtered products by price
  const fetchPriceFilteredProducts = async (value: string) => {
    setLoading(true);
    try {
      const productData = await ProductService.getProductsBySearch(value);
      if (productData.products) {
        const transformData = productData.products.map(
          ({
            id,
            title,
            price,
            thumbnail,
            brand,
            category,
            description,
            rating,
            stock,
          }: Product) => ({
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
      <Typography variant="h6">Price Range</Typography>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
      <Typography variant="body2">
        Your range of price is between ₹{sliderValue[0]} and ₹{sliderValue[1]}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Customer Rating
      </Typography>
      <Stack>
        <Rating name="half-rating" defaultValue={0} precision={0.5} /> & Up
      </Stack>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Category
      </Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Beauty" />
        <FormControlLabel control={<Checkbox />} label="Groceries" />
        <FormControlLabel control={<Checkbox />} label="Furniture" />
      </FormGroup>
    </>
  );
};

export default Sidebar;
