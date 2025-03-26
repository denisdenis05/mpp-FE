import DashboardTable from "@/components/dashboard-table";
import { COLUMNS, DASHBOARD_TITLE } from "../../constants";
import { DashboardContainer, MainContainer, Title } from "./home-page.style";
import Navbar from "@/components/navbar";
import { useData } from "@/DataContext";

const HomePage = () => {
  const { data, updateData } = useData();

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{DASHBOARD_TITLE}</Title>
          <DashboardTable columns={COLUMNS} data={data}></DashboardTable>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default HomePage;
