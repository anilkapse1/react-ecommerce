import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeComponent from "./theme/mui";
import { ToastProvider } from "./context/ToastContext";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ThemeComponent>
      <ToastProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </ToastProvider>
    </ThemeComponent>
  );
};

export default App;
