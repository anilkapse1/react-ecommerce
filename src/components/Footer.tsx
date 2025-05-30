import { Typography } from "@mui/material";
import { FooterWrapper } from "../styles/FooterStyle";

const Footer = () => {
  return (
    <FooterWrapper className="common_padding">
        <div className="footer__section">
          <h4 className="footer__title">Shopfinity</h4>
          <p className="footer__desc">Your one-stop shop for everything!</p>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/products">All Products</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Customer Service</h4>
          <ul className="footer__list">
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/shipping">Shipping & Returns</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Follow Us</h4>
          <div className="footer__social-icons">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>

        <div className="footer__bottom">
          <Typography variant="subtitle2">© {new Date().getFullYear()} Shopfinity. All rights reserved.</Typography>
        </div>
    </FooterWrapper>
  );
};

export default Footer;
