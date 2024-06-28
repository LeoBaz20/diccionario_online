import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  StarIcon,
  LanguageIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  {
    name: "Traductor",
    icon: LanguageIcon,
    href: "/translatePage",
  },
  {
    name: "Listas",
    icon: StarIcon,
    href: "/Lists"
  },
];

function NavItem({ children, href = "#" }) {
  return (
    React.createElement("li", null,
      React.createElement(Link, { href: href, passHref: true },
        React.createElement(Typography, { variant: "paragraph", color: "white", className: "flex items-center gap-2 font-medium text-white" },
          children
        )
      )
    )
  );
}

export function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleOpenMenu = () => setOpenMenu((cur) => !cur);
  const handleOpenUser = () => setOpenUser((cur) => !cur);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenMenu(false);
        setOpenUser(false);
      }
    });
  }, []);

  if (!mounted) return null; // Evitar el renderizado en el servidor

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      className="border-0 bg-blue-900 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <Typography as="a" color="white" className="text-lg font-bold">
            DiccionarioWEB
          </Typography>
        </Link>
        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              {name}
            </NavItem>
          ))}
        </ul>
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/signin">
              <Button variant="text" color="white">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/signup">
              <Button color="gray">Registrarse</Button>
            </Link>
          </div>
      </div>
    </MTNavbar>
  );
}

export default Navbar;
