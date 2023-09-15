/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"; // imported React from 'react';

// Import App Info
import {AppName} from '@app/App_Config'; // App Info

export default function Footer({FooterStyle}) {
  return (
    <>
      <footer className={`footer footer-center p-4 bg-base-300 text-base-content bottom-0 ${FooterStyle}`}>
        <aside>
          <p>Copyright © 2023 - All right reserved by {AppName}</p>
        </aside>
      </footer>
    </>
  );
}
Footer.defaultProps = {
  FooterStyle: "fixed"
}; // Default Props