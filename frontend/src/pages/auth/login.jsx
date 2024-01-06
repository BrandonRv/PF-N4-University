import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useUniversityContext } from "../../context/UniversityProvider";
import logo from "../../assets/logo.png";
//import { Link } from "react-router-dom";
import { useRef } from "react";
import useDarkMode from "../../service/useDarkMode";

export function Login() {

  const { setCorreo, setContrasena, error, handleSubmit, correo, contrasena, rol} = useUniversityContext();
  const iconRef = useRef(null);
  const DarkMode = useDarkMode(iconRef);
  sessionStorage.setItem("rol", rol);

  return (
    <section
      className="h-screen grid place-items-center w-full bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 dark:from-gray-900 dark:via-gray-600 dark:to-gray-400 dark:bg-gradient-to-r"
    >
      <div className="w-full abolute h-screen grid place-items-center bg-opacity-20 bg-blue-900 dark:bg-gray-900 dark:bg-opacity-50 transition-all duration-1000 ease-in-out">
        <form
          onSubmit={handleSubmit}
          className="bg-[#fff5d2] flex flex-col justify-center md:justify-between h-full md:h-fit w-full md:w-96 p-10 md:p-10 border-0 md:border border-gray-400 md:rounded-3xl"
        >
          <div className="overflow-hidden rounded-3xl">
            <img className="scale-150" src={logo} alt="logo" />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 mt-0 font-medium text-center">
              Bienvenido ingresa con tu cuenta
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              type="password"
              size="lg"
              placeholder="********"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <p className="text-center text-red-500 text-sm">{error && <p>{error}</p>} </p>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-2" fullWidth>
            Ingresar
          </Button>
          <div className="flex items-center justify-between gap-2 mt-2">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="../dashboard">
              ¿Olvidó su contraseña?
              </a>
            </Typography>
          </div>
        </form>
        <div className="hidden w-3/12 lg:block">
        <div className="h-full w-full object-cover p-6 rounded-3xl text-center bg-[#fff5d2]">
          <li className="flex justify-center">admin@mail.com <p>&#160; PASS: 1234</p></li>
          <li className="flex justify-center">maestro@mail.com <p>&#160; PASS: 1234</p></li>
          <li className="flex justify-center">alumno@mail.com<p>&#160; PASS: 1234</p></li>
        </div>
      </div>
      </div>
      <button
        id="dark-mode-toggle"
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-300 dark:bg-gray-400 transition-colors duration-1000 ease-in-out shadow-lg flex items-center justify-center"
        onClick={DarkMode}
      >
        <i ref={iconRef} className="fa-solid fa-moon text-gray-900"></i>
      </button>
    </section>
  );
}

export default Login;