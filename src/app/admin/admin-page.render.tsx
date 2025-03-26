"use client";

import { COLUMNS, ADMIN_PAGE_TITLE } from "../../constants";
import { DashboardContainer, MainContainer, Title } from "./admin-page.style";

import Navbar from "@/components/navbar";
import { useData } from "@/DataContext";
import AdminTable from "@/components/admin-table";

const AdminPage = () => {
  const { data, updateData } = useData();

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{ADMIN_PAGE_TITLE}</Title>
          <AdminTable columns={COLUMNS} data={data}></AdminTable>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AdminPage;
