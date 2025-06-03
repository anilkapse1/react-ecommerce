export interface FilterType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;

  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;

  keyWord: string;
  setKeyword: (keyword: string) => void;
}
