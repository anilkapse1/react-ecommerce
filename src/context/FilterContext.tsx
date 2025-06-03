import React, { createContext, useContext, useState} from "react";
import type { FilterType } from "../models/IFilter";

const FilterContext = createContext<FilterType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyWord, setKeyword] = useState<string>("");

  return <FilterContext.Provider value = {
    {
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyWord,
        setKeyword
    }
  }>{children}</FilterContext.Provider>;
};

export const useFilter  = () => {
    const context = useContext(FilterContext);
    if(context === undefined) {
        throw new Error("useFilter must be used within a filterProvider");
        
    } 
    return context
}
