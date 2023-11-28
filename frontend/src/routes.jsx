import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Permisos, Maestros, Alumnos, Clases } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "permisos",
        path: "/permisos",
        element: <Permisos />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "maestros",
        path: "/Maestros",
        element: <Maestros />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "alumnos",
        path: "/Alumnos",
        element: <Alumnos />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "clases",
        path: "/clases",
        element: <Clases />,
      },
    ],
  },
  {
    title: "Ir al Loging",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Login",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
