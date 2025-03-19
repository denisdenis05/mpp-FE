"use client";

import { DASHBOARD_TITLE } from "../../constants";
import {
  AddButton,
  DashboardContainer,
  MainContainer,
  Title,
} from "./admin-page.style";

import Navbar from "@/components/navbar";
import { useData } from "@/DataContext";
import AdminTable from "@/components/admin-table";

const columns = ["Title", "Director", "Writer", "Genre", "MPA", "Rating"];

const AdminPage = () => {
  const { data, updateData } = useData();

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{DASHBOARD_TITLE}</Title>
          <AdminTable columns={columns} data={data}></AdminTable>
        </DashboardContainer>
        <AddButton href="/add-movie">Add new</AddButton>
      </MainContainer>
    </>
  );
};

export default AdminPage;
