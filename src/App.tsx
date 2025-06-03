import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeComponent from "./theme/mui";
import { ToastProvider } from "./context/ToastContext";
import { ProductProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";

const App = () => {
  return (
    <ThemeComponent>
      <ToastProvider>
        <ProductProvider>
          <FilterProvider>
            <RouterProvider router={router} />
          </FilterProvider>
        </ProductProvider>
      </ToastProvider>
    </ThemeComponent>
  );
};

export default App;
