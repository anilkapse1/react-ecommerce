import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { LayoutWrapper } from "../styles/LayoutStyle";
import { useTheme } from "@mui/material/styles";

const Layout = () => (
  <LayoutWrapper>
    <Header/>
    <div className="main-content">
      <aside>
        <Sidebar />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
    <Footer/>
  </LayoutWrapper>
);

export default Layout;

