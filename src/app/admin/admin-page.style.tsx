import styled from "styled-components";
import { Joan } from "next/font/google";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  padding: 5%;
  background-color: #d9d9d9;
`;

const DashboardContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 30px;
`;

const AddButton = styled.a`
  color: inherit;
  text-decoration: none;
  background-color: #9a8282;
  height: 40px;
  width: 120px;
  border-radius: 5px;
  border: none;
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
  box-shadow: none;
  font-family: inherit;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export { Title, AddButton, MainContainer, DashboardContainer };
