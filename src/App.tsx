import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeComponent from "./theme/mui";

const App = () => {
  return (
    <ThemeComponent>
      <RouterProvider router={router} />
    </ThemeComponent>
  );
};

export default App;
