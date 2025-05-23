import { ADMIN_PAGE_TEXT, HOME_PAGE_TEXT } from "@/constants";
import { AdminPageButton, LogoImage, NavbarContainer } from "./Navbar.style";
import { usePathname, useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { useData } from "@/DataContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { getToken } = useData();

  function isAdmin(token: string | undefined): boolean {
    if (!token) return false;

    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;

      console.log(decoded);
      return (
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ] === "admin"
      );
    } catch (err) {
      return false;
    }
  }

  return (
    <NavbarContainer>
      <LogoImage
        onClick={() => {
          router.push("/home");
        }}
      />
      <div>
        {pathname !== "/admin" && isAdmin(getToken()) && (
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
