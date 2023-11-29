import React, { createContext, useContext, useState, useEffect } from "react";

const UniversityContext = createContext();

export const useUniversityContext = () => useContext(UniversityContext);

export const UniversityProvider = ({ children }) => {
  const [rol, setRol] = useState(null)
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [seccion, setSeccion] = useState("");
  const [catergoria, setCatergoria] = useState("");
  const [clases, setClases] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/backend/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasena }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (res.status === 401) {
              throw new Error(data.passIncorrecto);
            }
            if (res.status === 404) {
              throw new Error(data.userInvalido);
            }
            throw new Error("Ocurrió un error al iniciar sesión");
          });
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setRol(parseInt(data?.rol, 10));
        localStorage.setItem("rol", data.rol);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        setError(err.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {

    const datosDashboard = async () => {

      const res = await fetch("http://localhost:3000/backend/dashboard", { method: "POST", headers: { Authorization: `Bearer ${token}`, }, })
      const data1 = await res.json();
      setSeccion(data1?.error);
      setUsuario(data1?.perfilInfo); 
      setCatergoria(data1?.categoria);
      setClases(data1?.subjectsInfo);  
      setAlumnos(data1?.studentAll);
      setMaestros(data1?.maestrosAll);
      setPermisos(data1?.permisosInfo);
      setRol(parseInt(data1?.rolUser, 10));
    }

    datosDashboard();
  }, [token, seccion, rol]);

  const contextValue = {
    seccion,
    setCorreo,
    contrasena,
    handleSubmit,
    error,
    setContrasena,
    correo,
    usuario,
    catergoria,
    clases,
    alumnos,
    maestros,
    permisos,
    rol,
  };

  return (
    <UniversityContext.Provider value={contextValue}>
      {children}
    </UniversityContext.Provider>
  );
};
