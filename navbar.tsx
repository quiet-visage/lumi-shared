import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";

import { ThemeSwitch } from "./theme-switch";
import { useContext } from "react";
import { UserTokenContext } from "@/app/providers";
import { decodeToken } from "react-jwt";
import { User } from "@heroui/user";

export const Navbar = () => {
  const token = useContext(UserTokenContext);
  const decodedToken = decodeToken(token);
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <User
          name={
            //@ts-expect-error
            decodedToken.name
          }
          description={
            //@ts-expect-error
            `${decodedToken.branch} - ${decodedToken.sector}`
          }
        />
      </NavbarContent>
      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
