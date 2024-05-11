import React from "react";
import "../styles/Footer.css"
import { FaFacebook , FaInstagram, FaWhatsapp} from "react-icons/fa";
function Footer() {

  return (
    <footer>
    <div className="footer-container"></div>
    <div className="social-media-container">
    <FaFacebook className="social-media-icons"></FaFacebook>
    <FaInstagram className="social-media-icons"></FaInstagram>
    <FaWhatsapp className="social-media-icons"></FaWhatsapp>
    </div>
    <p className="footer-text">Natalia Pinto</p>
    <p className="footer-text">WD IRONHACK 2024</p>
    </footer>
  );
}

export default Footer;
