import React from "react";

interface FooterProps {
  companyName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
  return (
    <footer>
      <div>
        <p>
          &copy; {year} <strong>{companyName}</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
