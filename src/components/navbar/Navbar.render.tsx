import { ADMIN_PAGE_TEXT, HOME_PAGE_TEXT } from "@/constants";
import { AdminPageButton, LogoImage, NavbarContainer } from "./Navbar.style";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <NavbarContainer>
      <LogoImage
        onClick={() => {
          router.push("/home");
        }}
      />
      <div>
        {pathname !== "/admin" && (
          <AdminPageButton href="/admin">{ADMIN_PAGE_TEXT}</AdminPageButton>
        )}
        {pathname !== "/home" && (
          <AdminPageButton href="/home">{HOME_PAGE_TEXT}</AdminPageButton>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
