import styled from "styled-components";
import Logo from "../../assets/Logo.svg";

const NavbarContainer = styled.div`
  background-color: #9a8282;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
`;

const LogoImage = styled(Logo)`
  transform: scale(0.7);
`;

const AdminPageButton = styled.a`
  color: inherit;
  text-decoration: none;

  background-color: #d9d9d9;
  border-radius: 26px;
  padding: 10px;
  height: 40px;
  margin: 10px;

  outline: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:active {
    color: inherit;
  }
`;

export { NavbarContainer, LogoImage, AdminPageButton };
