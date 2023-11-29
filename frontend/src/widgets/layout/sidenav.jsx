import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useUniversityContext } from "../../context/UniversityProvider";
import logoU from "../../assets/logoU.jpg"

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const { usuario, catergoria, rol } = useUniversityContext();
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            className="flex items-center ml-7 justify-start"
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <div class="flex  h-12 w-12 rounded-full overflow-hidden">
              <img class="h-12 w-12" src={logoU} alt="LogoUni.jpg" />
            </div>
            <p className="ml-5">{brandName}</p>
          </Typography>
        </Link>
        <hr />
        <div>
          <Typography
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-medium pt-3 flex opacity-75 items-center gap-4 px-4 capitalize"
          >
            {catergoria}
          </Typography>

          <Typography
            variant="small"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="opacity-75 font-normal capitalize flex items-center gap-4 px-4 mb-4"
          >
            {usuario[0]?.nombre} {usuario[0]?.apellido}
          </Typography>
          <hr />
        </div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }) => {
          // Filtra las páginas según el rol del usuario
          const filteredPages = pages.filter((page) => page.rol === rol);
          // Si no hay páginas que coincidan con el rol, no renderiza nada para esta categoría
          if (filteredPages.length === 0) {
            return null;
          }
          return (
            <ul className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {filteredPages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                              ? "white"
                              : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "Universidad",
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;

