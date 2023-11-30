import React from "react";
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useNavigate } from "react-router-dom";
import { useUniversityContext } from "../context/UniversityProvider";

export function Dashboard() {
  const { seccion, rol } = useUniversityContext();
  sessionStorage.setItem("rol", rol);
  const [controller, dispatch] = useMaterialTailwindController();
  const token = localStorage.getItem("token");
  const { sidenavType } = controller;
  const navigate = useNavigate();
  let seccionClose = "Sección inválida."
  let seccionExp = "Sección Caducada."
  let seccionRol = "Sin rol Asignado."
  let condicion = "Sin Autorización"
  const body = document.body;

  if (!token) {
    navigate("/auth/sign-in");
  } else if (seccionClose === seccion) {
    navigate("/auth/sign-in");
  } else if (seccionExp === seccion) {
    navigate("/auth/sign-in");
  } else if (seccionRol === seccion) {
    navigate("/auth/sign-in");
  } else if (condicion === seccion) {
    navigate("/auth/sign-in");
  }

  if (sidenavType === "white") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else if (sidenavType === "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
  } else if (sidenavType === "transparent") {
    body.classList.remove("light");
    body.classList.add("dark");
  }

  localStorage.setItem("theme", sidenavType);

  return (
    <div id='modoOzcuro' className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 dark:from-gray-400 dark:via-gray-200 dark:to-gray-100 dark:bg-gradient-to-r">
      <div className="min-h-screen bg-opacity-40 bg-blue-300 dark:bg-gray-300 dark:bg-opacity-50 transition-all duration-1000 ease-in-out">
        <Sidenav
          routes={routes}
        />
        <div className="p-4 xl:ml-80">
          <DashboardNavbar />
          <Configurator />
          <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </IconButton>
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages
                  .filter((page) => page.rol === rol)
                  .map(({ path, element }) => (
                    <Route
                      exact
                      path={path}
                      element={element}
                    />
                  ))
            )}
          </Routes>
          <div className="text-blue-gray-800">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
