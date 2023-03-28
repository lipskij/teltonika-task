import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../src/images/logo.svg";

const Header: React.FC = () => {
  const location = useLocation();
  let headerText = "";
  const pathName = location.pathname.split("/").slice(1, 2).toString();

  switch (pathName) {
    case "new-user":
      headerText = "New User";
      break;
    case "new-category":
      headerText = "New Category";
      break;
    case "category":
      headerText = "Category";
      break;
    default:
      headerText = "Welcome";
  }

  const handleToggle = () => {
    const nav = document.querySelector(".mobile-nav");
    nav?.classList.toggle("open");
    const hamburger = document.querySelector(".hamburger");
    hamburger?.classList.toggle("active");
  };

  return (
    <header className='header'>
      <img src={logo} alt='logo' />
      <h1>{headerText}</h1>

      <div className='hamburger' onClick={handleToggle}>
        <div className='line line1'></div>
        <div className='line line2'></div>
        <div className='line line3'></div>
      </div>
    </header>
  );
};

export default Header;
