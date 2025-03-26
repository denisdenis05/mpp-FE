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

export { Title, MainContainer, DashboardContainer };
