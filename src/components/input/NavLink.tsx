import React, { useState } from "react";

interface NavLinkProps {
  href?: string; // Optional link destination
  children: React.ReactNode; // Content inside the link/button
  onClick?: () => void; // Optional click handler
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    textShadow: isHovered
      ? "0px 0px 6px rgba(105, 105, 105, 0.4), 0px 0px 16px rgba(0, 0, 0, 1)" 
      : "0px 0px 6px rgba(235, 235, 235, 0.6), 0px 0px 16px rgba(0, 0, 0, 1)",
    color: isHovered ? "c3c3c3" : "#inherit", // Optional color change
    transition: "text-shadow 0.3s ease-in-out, color 0.3s ease-in-out",
    textDecoration: 'underline'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(); // Trigger the onClick handler if provided
    } else if (href) {
      window.location.href = href; // Navigate to the link if href is provided
    }
  };

  return (
    <div
      style={styles}
      className="cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default NavLink;
