import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Switch,
  Chip,
} from "@material-tailwind/react";
import avatar1 from "../../assets/user.png"
import { useUniversityContext } from "../../context/UniversityProvider";

export function Permisos() {

  const { permisos, rolAll } = useUniversityContext();
  const [modalPermiso, setModalPermiso] = useState(false);
  const [correo, setCorreo] = useState("");
  const [id_rol, setId_rol] = useState("null");
  const [id_user, setId_user] = useState("null");
  const [condicion, setCondicion] = useState("0");
  const [respuesta, setRespuesta] = useState("");
  const token = localStorage.getItem("token");
  let update = "permisos";

  // funcion para editar con fetch
  const editPermisos = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/permission/edit", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, update, id_user, id_rol, correo, condicion }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 2000);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lista de Permisos
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["email/usuario", "permiso", "estado", "acciones"].map((el) => (
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
              {permisos.map(
                ({ email, nombre_del_rol, condicion, id_user, id_rol }, key) => {
                  const className = `py-3 px-5 ${key === permisos.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={avatar1} alt="usuario.png" size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {nombre_del_rol === 'ADMIN' ? <Chip variant="gradient" color="yellow" value="Administrador" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> :
                            (nombre_del_rol === 'MAESTRO' ? <Chip variant="gradient" color="blue" value="Maestro" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> :
                              (nombre_del_rol === 'ALUMNO' ? <Chip variant="gradient" color="blue-gray" value="Alumno" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> :
                                <Chip variant="gradient" color="red" value="Sin Rol" className="py-0.5 px-2 text-[11px] font-medium w-fit" />))}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {condicion === '0' ? <Chip variant="gradient" color="red" value="Inactivo" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> : <Chip variant="gradient" color="green" value="Activo" className="py-0.5 px-2 text-[11px] font-medium w-fit" />}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          onClick={() => {
                            setCondicion(condicion === '0' ? 0 : 1);
                            setId_user(id_user);
                            setCorreo(email);
                            setId_rol(id_rol);
                            setModalPermiso(true);
                          }}
                          className="text-xs font-semibold cursor-pointer text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {modalPermiso ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between  border-b border-solid border-blueGray-300 rounded-t">
                  <h4 className="text-2xl">
                    Editar Permisos
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 -mt-4 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalPermiso(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-0 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg text-gray-700 font-normal leading-relaxed">
                    Modifica los permisos aqui, por favor.
                  </p>
                </div>
                <label>Correo de Usuario</label>
                <input
                  type="email"
                  className="p-2 rounded-lg border border-gray-800"
                  defaultValue={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  />
                <label>Rol de Usuario</label>
                <select
                  className="p-2 rounded-lg border border-gray-800"
                  defaultValue={id_rol === '1' ? "Administrador" : id_rol === '2' ? "Maestro" : id_rol === '3' ? "Alumno" : "Sin Rol" }
                  onChange={(e) => setId_rol(e.target.value === "Administrador" ? 1 : e.target.value === "Maestro" ? 2 : e.target.value === "Alumno" ? 3 : null)}
                >
                  <option value="" disabled hidden>Selecciona un Rol</option>
                  {rolAll.map(({ id_rol : rolValue }, key) => (  
                    <option key={key} defaultValue={rolValue}>
                      {
                      rolValue === '1' ? "Administrador" : 
                      rolValue === '2' ? "Maestro" : 
                      rolValue === '3' ? "Alumno" : "Sin Rol"
                      }
                    </option>
                  ))}
                </select> 

                 <div className="flex mt-6 mb-6 flex-col gap-6">
                  <Switch
                    label={condicion === 0 ? "Usuario Inactivo" : "Usuario Activo"}
                    defaultChecked={condicion === 0 ? false : true}
                    onChange={(e) => setCondicion(e.target.checked ? 1 : 0)}
                    labelProps={{
                      className: "text-sm font-normal ml-3 text-blue-gray-500",
                    }}
                  />
                   <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                </div> 
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalPermiso(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editPermisos}
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

export default Permisos;
