import React, { createContext, useContext, useState, useEffect } from "react";

const UniversityContext = createContext();

export const useUniversityContext = () => useContext(UniversityContext);

export const UniversityProvider = ({ children }) => {
  //const PORT = process.env.PORT ?? 5500;
  const [rol, setRol] = useState(null);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [seccion, setSeccion] = useState("");
  const [catergoria, setCatergoria] = useState("");
  const [clases, setClases] = useState([]);
  const [asignTeacher, setAsignTeacher] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [maestroClass, setMaestroClass] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [faltante, setFaltante] = useState([]);
  const [seleccionTeacher, setSeleccionTeacher] = useState([]);
  const [seleccionmateria, setSeleccionmateria] = useState([]);
  const [rolAll, setRolAll] = useState(null);
  const token = localStorage.getItem("token");


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/backend/login", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ correo, contrasena }), })
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
        setSeccion(data.error); 
        setError(data.error);
        localStorage.setItem("token", data.token);
        setRol(parseInt(data?.rol, 10));
        sessionStorage.setItem("rol", data.rol);
        if (data.error !== 'Sin Autorización') {

        window.location.href = `/dashboard/home`; //http://127.0.0.1:5500:${PORT}
      }
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
      setAsignTeacher(data1?.profeasign);  
      setAlumnos(data1?.studentAll);
      setMaestros(data1?.maestrosAll);
      setPermisos(data1?.permisosInfo);
      setRolAll(data1?.rolexall);
      setRol(parseInt(data1?.rolUser, 10));
      setMaestroClass(data1?.studentMaestro);
      setCalificaciones(data1?.seeRatings);
      setFaltante(data1?.seeMaterias);
      const clasesFiltradas = data1?.subjectsInfo.filter((clase) => clase.id_user === null);
      const MaestrosFiltrados = data1?.subjectsInfo.filter((clase) => clase.id_user !== null);
      const nameMateriasFiltradas = clasesFiltradas.map((clase) => clase);
      const nameMaestrosFiltrados = MaestrosFiltrados.map((clase) => clase);
      setSeleccionTeacher(nameMateriasFiltradas);
      setSeleccionmateria(nameMaestrosFiltrados);
    }

     datosDashboard();
      const intervalId = setInterval(datosDashboard, 1000); 
      return () => clearInterval(intervalId);

  }, [ token, rol, seccion ]);

  const contextValue = {
    seccion,
    setCorreo,
    contrasena,
    handleSubmit,
    error,
    setContrasena,
    calificaciones,
    faltante,
    correo,
    usuario,
    catergoria,
    clases,
    alumnos,
    maestros,
    permisos,
    maestroClass,
    rol,
    rolAll,
    asignTeacher,
    seleccionTeacher,
    seleccionmateria,
  };

  return (
    <UniversityContext.Provider value={contextValue}>
      {children}
    </UniversityContext.Provider>
  );
};
