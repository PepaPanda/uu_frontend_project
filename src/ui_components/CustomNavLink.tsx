import { NavLink } from "react-router";
import styled from "styled-components";

const CustomNavLink = styled(NavLink)`
  color: #555;
  text-decoration: none;

  &[aria-current="page"] {
    font-weight: bold;
    color: black;
  }
  &:hover {
    text-shadow: 0 0 1px currentColor;
  }
`;

export default CustomNavLink;
