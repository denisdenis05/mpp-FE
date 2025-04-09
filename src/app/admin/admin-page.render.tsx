"use client";

import { COLUMNS, ADMIN_PAGE_TITLE } from "../../constants";
import { DashboardContainer, MainContainer, Title } from "./admin-page.style";

import Navbar from "@/components/navbar";
import AdminTable from "@/components/admin-table";
import { useEffect } from "react";

const AdminPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{ADMIN_PAGE_TITLE}</Title>
          <AdminTable columns={COLUMNS}></AdminTable>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AdminPage;
