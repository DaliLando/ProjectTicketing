import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => (
  <footer className="page-footer font-small blue">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase" style={{ color: "white" }}>Kasstichi ? Kossli Maak</h5>
          <p style={{ color: "white" }}>Your number one destination for booking events</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase" style={{ color: "white" }}>Links</h5>
          <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
            <FacebookIcon sx={{ fontSize: "30px", color: "white", cursor: "pointer" }} />
            <XIcon sx={{ fontSize: "30px", color: "white", cursor: "pointer" }} />
            <LinkedInIcon sx={{ fontSize: "30px", color: "white", cursor: "pointer" }} />
            <YouTubeIcon sx={{ fontSize: "30px", color: "white", cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3" style={{ color: "white" }}>
      © 2024 Copyright : 
      <a href="https://kossli-maak.onrender.com/" style={{ color: "white" }}> Kossli-Maak.com</a>
    </div>
  </footer>
);

export default Footer;
