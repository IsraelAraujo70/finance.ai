"use client";
import { usePathname } from "next/navigation";
import MobileNavbar from "../(home)/_components/mobile-nav-bar";
import DesktopNavbar from "../(home)/_components/desktop-nav-bar";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile navbar will be hidden on md screens and above via its internal classes */}
      <MobileNavbar pathname={pathname} />

      {/* Desktop navbar will be hidden on smaller screens via its internal classes */}
      <DesktopNavbar pathname={pathname} />
    </>
  );
};

export default Navbar;
