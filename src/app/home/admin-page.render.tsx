"use client";

import { COLUMNS, HOME_PAGE_TITLE } from "../../constants";
import { DashboardContainer, MainContainer, Title } from "./admin-page.style";

import Navbar from "@/components/navbar";
import AdminTable from "@/components/admin-table";
import { useEffect } from "react";
import { useData } from "@/DataContext";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { isLoggedIn } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          <Title>{HOME_PAGE_TITLE}</Title>
          <AdminTable columns={COLUMNS}></AdminTable>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AdminPage;
