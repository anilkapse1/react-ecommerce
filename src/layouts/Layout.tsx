import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { CartProvider } from '../context/CartContext';
import { LayoutWrapper } from "../styles/LayoutStyle";

const Layout = () => (
  <CartProvider >
  <LayoutWrapper>
    <Header/>
    <div className="main-content common_padding">
      <aside>
        <Sidebar />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
    <Footer/>
  </LayoutWrapper>
  </CartProvider>
);

export default Layout;

