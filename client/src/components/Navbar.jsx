import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import LogoImage from "../Utils/Images/log.jpg"; // Ensure to import the logo image
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material"; // If using Material UI Avatar
import { logout } from "../redux/reducer/userSlice";
import { useDispatch } from "react-redux";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 30};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavLogo = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  font-size: 22px;
`;

const Logo = styled.img`
  height: 42px;
`;

const NavItems = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};  // Show when menu is toggled
    flex-direction: column;
    position: absolute;
    top: 80px;  // Position it under the menu icon
    left: 0;
    background-color: ${({ theme }) => theme.bg};
    width: 100%;
    z-index: 1;
    justify-content: flex-start;  // Align items to the left
    padding: 10px 0;  // Adjust padding if necessary
    border: 1px solid ${({ theme }) => theme.text_secondary + 30};  // Add border when menu is shown
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  margin: 0 12px;

  &.active {
    color: ${({ theme }) => theme.primary}; /* Active link color */
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    margin: 10px 0;  // Adjust margin for mobile
    width: 100%;  // Ensure it takes up full width in the dropdown
    text-align: left;  // Align text to the left in mobile view
    padding-left: 50px; // Add some padding if needed
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;

const TextButton = styled.div`
  text-align: right;
  color: blue; /* Changed to light blue */
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);  // State for mobile menu toggle
  const navRef = useRef(); // Ref to capture nav area

  const toggleMenu = () => setIsOpen((prev) => !prev);  // Toggle menu on mobile

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false); // Close menu if click outside of menu
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Nav ref={navRef}>
      <NavContainer>
        {/* Mobile Icon */}
        <MobileIcon onClick={toggleMenu}>
          <MenuRounded sx={{ color: "inherit" }} />
        </MobileIcon>

        {/* Logo */}
        <NavLogo to="/">
          <Logo src={LogoImage} alt="Fittrack Logo" />
          Fittrack
        </NavLogo>

        {/* Navigation Links */}
        <NavItems isOpen={isOpen}>
          <StyledNavLink to="/" exact activeClassName="active" onClick={() => setIsOpen(false)}>
            Dashboard
          </StyledNavLink>
          <StyledNavLink to="/workouts" exact activeClassName="active" onClick={() => setIsOpen(false)}>
            Workouts
          </StyledNavLink>
          <StyledNavLink to="/tutorials" exact activeClassName="active" onClick={() => setIsOpen(false)}>
            Tutorials
          </StyledNavLink>
          <StyledNavLink to="/blogs" exact activeClassName="active" onClick={() => setIsOpen(false)}>
            Blogs
          </StyledNavLink>
          <StyledNavLink to="/contact" exact activeClassName="active" onClick={() => setIsOpen(false)}>
            Contact
          </StyledNavLink>
        </NavItems>

        {/* User Profile & Logout */}
        <UserContainer>
          {/* Handle Avatar with fallback */}
          {currentUser ? (
            <Avatar sx={{ width: 40, height: 40 }} src={currentUser?.img || "/default-avatar.jpg"}>
              {currentUser?.name ? currentUser.name[0] : "U"}
            </Avatar>
          ) : (
            <Avatar sx={{ width: 40, height: 40 }}></Avatar> // Fallback Avatar
          )}
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
