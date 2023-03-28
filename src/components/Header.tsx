import React from "react";
import logo from "../../src/logo.svg";

const Header: React.FC = () => {
  return (
    <header className='header'>
      <img src={logo} alt='logo' />
      <h1>Header</h1>
    </header>
  );
};

export default Header;
