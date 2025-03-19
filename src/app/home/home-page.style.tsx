import styled from "styled-components";
import { Joan } from "next/font/google";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 5%;
  background-color: #d9d9d9;
`;

const DashboardContainer = styled.div`
  margin-top: 2%;
  box-sizing: border-box;
  background-color: gray;
  height: 100%;
  padding: 5%;
  border-radius: 38px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 30px;
`;

export { Title, MainContainer, DashboardContainer };
