import DashboardTable from "@/components/dashboard-table";
import { DASHBOARD_TITLE } from "../../constants";
import { DashboardContainer, MainContainer, Title } from "./home-page.style";
import Navbar from "@/components/navbar";
import { useData } from "@/DataContext";

const columns = ["Title", "Director", "Writer", "Genre", "MPA", "Rating"];

const HomePage = () => {
  const { data, updateData } = useData();

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{DASHBOARD_TITLE}</Title>
          <DashboardTable columns={columns} data={data}></DashboardTable>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default HomePage;
