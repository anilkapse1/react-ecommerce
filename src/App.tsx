import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeComponent from "./theme/mui";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ThemeComponent>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeComponent>
  );
};

export default App;
