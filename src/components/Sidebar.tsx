import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useFilter } from "../context/FilterContext";
import Grid from '@mui/material/Grid';

const Sidebar = () => {
  const { products, setProducts, originalProducts } = useProductContext();
  const { searchProducts, refreshProducts } = useProductContext();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>(["apple", "watch", "fashion", "trend", "shoes", "shirt"]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const { setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyWord, setKeyword } =
    useFilter();

  useEffect(() => {
    if (originalProducts.length > 0) {
      const uniqueCategories = Array.from(new Set(originalProducts.map((product) => product.category)));
      setCategories(uniqueCategories);
    }
  }, [originalProducts]);

  // SET MIN PRICE
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  // SET MAX PRICE
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  // SET CATEGORIES
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  // HANDLE KEYWORDS
  const handleKeywordClick = (keyword: string) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null);
      setKeyword(""); 
    } else {
      setSelectedKeyword(keyword);
      setKeyword(keyword); 
    }
  };

  // RESET FILTER
  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategory("");
    setKeyword("");
    refreshProducts();
  };

  useEffect(() => {
    let filteredProduct = originalProducts;

    if (selectedCategory && selectedCategory.trim() !== "") {
      filteredProduct = filteredProduct.filter((product) => product.category === selectedCategory);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (minPrice <= maxPrice) {
        filteredProduct = filteredProduct.filter((product) => product.price >= minPrice && product.price <= maxPrice);
      } else {
        filteredProduct = [];
      }
    } else if (minPrice !== undefined) {
      filteredProduct = filteredProduct.filter((product) => product.price >= minPrice);
    } else if (maxPrice !== undefined) {
      filteredProduct = filteredProduct.filter((product) => product.price <= maxPrice);
    }

    if (keyWord && keyWord.trim() !== "") {
      searchProducts(keyWord); // This is async and should not be part of sync filtering
      return;
    }

    setProducts(filteredProduct);
  }, [selectedCategory, minPrice, maxPrice, keyWord]);

  console.log("final product is:", products);

  return (
    <React.Fragment>
      <Typography variant="h1" gutterBottom>
        Store
      </Typography>

      {/* MIN MAX */}
      <Grid container spacing={2}>
        <Grid size={3}>
          <TextField
            fullWidth
            label="Min"
            type="number"
            variant="outlined"
            name="min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
        </Grid>
        <Grid size={3}>
          <TextField
            fullWidth
            label="Max"
            type="number"
            variant="outlined"
            name="max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </Grid>
      </Grid>

      {/* CATEGORIES */}
      <FormControl component="fieldset" fullWidth sx={{ mt: 3 }}>
        <FormLabel component="legend">Categories</FormLabel>
        <RadioGroup name="category" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((val, idx) => (
            <FormControlLabel key={idx} value={val} control={<Radio />} label={val.toUpperCase()} />
          ))}
        </RadioGroup>
      </FormControl>

      {/* KEY WORDS */}
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        Keywords
      </Typography>
      <Stack spacing={1}>
        {keywords.map((keyword, index) => (
          <Button key={index} variant={selectedKeyword === keyword ? "contained" : "outlined"} onClick={() => handleKeywordClick(keyword)} fullWidth>
            {keyword.toUpperCase()}
          </Button>
        ))}
      </Stack>

      {/* RESET FILTER */}
      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 3 }} onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </React.Fragment>
  );
};

export default React.memo(Sidebar);
