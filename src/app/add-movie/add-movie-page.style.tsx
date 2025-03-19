import styled from "styled-components";
import Logo from "../../assets/Logo.svg";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  padding: 2%;
  background-color: #d9d9d9;
`;

const DashboardContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const AutoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  justify-content: center;
  margin-bottom: 40px;
  gap: 2%;
`;

const AutoGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row dense;
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
  max-height: calc(2 * (100px + 1rem));
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 30px;
`;

const LogoImage = styled(Logo)`
  transform: scale(0.7);
  position: absolute;
  top: 2%;
  left: 1%;
`;

const AddButton = styled.a`
  background-color: #9a8282;
  height: 40px;
  width: 120px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: none;
  font-family: inherit;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export {
  Title,
  AddButton,
  MainContainer,
  DashboardContainer,
  LogoImage,
  AutoGrid,
};
