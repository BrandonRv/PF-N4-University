import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Permisos, Maestros, Alumnos, Clases, Ensenar, Calificaciones, Materias } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const rolSeccion = parseInt(sessionStorage.getItem("rol"));

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        rol: rolSeccion,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        rol: rolSeccion,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 1,
        name: "permisos",
        path: "/permisos",
        element: <Permisos />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 1,
        name: "maestros",
        path: "/Maestros",
        element: <Maestros />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 1,
        name: "alumnos",
        path: "/Alumnos",
        element: <Alumnos />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 1,
        name: "clases",
        path: "/clases",
        element: <Clases />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 2,
        name: "alumnos",
        path: "/student",
        element: <Ensenar />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 3,
        name: "ver calificaciones",
        path: "/calificaciones",
        element: <Calificaciones />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        rol: 3,
        name: "administrar clases",
        path: "/materias",
        element: <Materias />,
      },
    ],
  },
  {
    title: "Ir al Loging",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        rol: rolSeccion,
        name: "Login",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
