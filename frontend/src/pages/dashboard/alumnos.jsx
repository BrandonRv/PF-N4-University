import { React, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuHandler,
} from "@material-tailwind/react";
import avatar1 from "../../assets/user.png"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useUniversityContext } from "../../context/UniversityProvider";

export function Alumnos() {

  const { alumnos } = useUniversityContext();
  const [modalAlumno, setModalAlumno] = useState(false);
  const [id_user, setId_user] = useState(null);
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [address, setAddress] = useState("");
  const [cumpleanos, setCumpleanos] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const token = localStorage.getItem("token");
  let update = "alumnos";

  // funcion para editar con fetch
  const editAlumno = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/students/edit", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, update, id_user, dni, correo, nombre, apellido, address, cumpleanos }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 2000);
    // Devuelve una Respuesta True si se Realizo correctamente la Actualizacion de Datos
  }

  // funcion para eliminar maestro con fetch 
  const eliminarAlumno = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/students/delete", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, id_user }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 2000);
  }

  function formatDate(dateString) {
    if (!dateString) return ''; // Manejar caso de fecha nula o indefinida

    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  function convertirFechaOriginal(fecha) {
    let partes = fecha.split("-");
    let nuevaFecha = partes[0] + "-" + partes[1] + "-" + partes[2];
    setCumpleanos(nuevaFecha);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lista de Alumnos
          </Typography>
        </CardHeader>
        <div className="h-1 mb-5">
        <p className="text-center text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["nombre/dni", "correo", "direccion", "fec. de nacimiento", "acciones"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumnos.map(
                ({ id_user, DNI, nombre, apellido, email, address, cumpleaños, }, key) => {
                  const className = `py-3 px-5 ${key === alumnos.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;
                  return (
                    <tr key={nombre}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={avatar1} alt="usuario.png" size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {nombre + " " + apellido}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {"DNI: " + " " + DNI}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {address}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {cumpleaños}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList
                            onClick={() => {
                              setId_user(id_user);
                              setDni(DNI)
                              setCorreo(email);
                              setNombre(nombre);
                              setApellido(apellido);
                              setAddress(address);
                              setCumpleanos(cumpleaños);
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                setId_user(id_user);
                                setDni(DNI)
                                setCorreo(email);
                                setNombre(nombre);
                                setApellido(apellido);
                                setAddress(address);
                                setCumpleanos(cumpleaños);
                                setModalAlumno(true);
                              }}>Editar Datos</MenuItem>
                            <MenuItem
                              onClick={() => {
                                setId_user(id_user);
                                eliminarAlumno();
                              }}
                            >Eliminarlo</MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {modalAlumno ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between  border-b border-solid border-blueGray-300 rounded-t">
                  <h4 className="text-2xl">
                    Editar Alumno
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 -mt-4 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalAlumno(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-0 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg text-gray-700 font-normal leading-relaxed">
                    Modifica los Datos aqui, por favor.
                  </p>
                </div>
                <label>DNI</label>
                <input type="number" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setDni(e.target.value)} defaultValue={dni} />
                <label>Correo Electronico</label>
                <input
                  type="email"
                  className="p-2 rounded-lg border border-gray-800"
                  defaultValue={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label>Nombres</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setNombre(e.target.value)} defaultValue={nombre} />
                <label>Apellidos</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setApellido(e.target.value)} defaultValue={apellido} />
                <label>Dirección</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setAddress(e.target.value)} defaultValue={address} />
                <label>Fecha de Nacimiento</label>
                <input type="date" className="p-2 rounded-lg border border-gray-800" onChange={(e) => convertirFechaOriginal(e.target.value)} defaultValue={formatDate(cumpleanos)} />
                <div className="flex mt-6 mb-6 flex-col gap-6">
                  <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalAlumno(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editAlumno}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </div>
  );
}

export default Alumnos;
