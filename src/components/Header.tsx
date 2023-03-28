import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../src/logo.svg";

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

  return (
    <header className='header'>
      <img src={logo} alt='logo' />
      <h1>{headerText}</h1>
    </header>
  );
};

export default Header;
