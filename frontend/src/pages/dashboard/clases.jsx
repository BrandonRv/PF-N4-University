import { React, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuHandler,
} from "@material-tailwind/react";
import avatar1 from "../../assets/user.png"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useUniversityContext } from "../../context/UniversityProvider";

export function Clases() {

  const { clases, asignTeacher, seleccionmateria } = useUniversityContext();
  const [modalClases, setModalClases] = useState(false);
  const [id_user, setId_user] = useState("null");
  const [maestroAsign, setMaestroAsign] = useState("");
  const [materiasss, setMateriasss] = useState("");
  const [maestroid, setMaestroid] = useState("null");
  const [materiaid, setMateriaid] = useState("null");
  const [respuesta, setRespuesta] = useState("");
  const [paraeliminar, setParaeliminar] = useState("null")
  const token = localStorage.getItem("token"); 
  let update = "clases";

  
  // funcion para editar con fetch
  const editClases = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/classes/edit", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, update, id_user, maestroid, materiaid, materiasss }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 2000);
    // Devuelve una Respuesta True si se Realizo correctamente la Actualizacion de Datos
  }

  // funcion para eliminar con fetch 
  // const eliminarDatos = async () => {

  //   const res = await fetch("http://localhost:3000/backend/dashboard", { method: "GET", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token }), })
  //   const data1 = await res.json();
  // }


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Lista de Clases
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["maestros", "materias", "alumnos inscritos", "acciones"].map((el) => (
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
              {clases.map(
                ({ id_user, nombre_maestro, apellido_maestro, id_materia, name_materia, cantidad_alumnos, id_maestro }, key) => {
                  const className = `py-3 px-5 ${key === clases.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;
                  return (
                    <tr key={name_materia}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {name_materia === null ? '' : <Avatar src={avatar1} alt="usuario.png" size="sm" variant="rounded" />}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name_materia === null ? '' : nombre_maestro === null ? <Chip variant="gradient" color="yellow" value="Sin Asignacion" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> : nombre_maestro + " " + apellido_maestro}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name_materia === null ? '' : name_materia}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name_materia === null ? '' : cantidad_alumnos}
                        </Typography>
                      </td>
                      <td className={className}>

                        {name_materia === null ? '' : (
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
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  setId_user(id_user);
                                  setParaeliminar(id_user);
                                  setMaestroAsign(nombre_maestro + " " + apellido_maestro);
                                  setMateriasss(name_materia);
                                  setMaestroid(id_maestro ? "null" : id_maestro);
                                  setMateriaid(id_materia);
                                  setModalClases(true);
                                }}>Editar Datos</MenuItem>
                              <MenuItem>Eliminarlo</MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {modalClases ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between  border-b border-solid border-blueGray-300 rounded-t">
                  <h4 className="text-2xl">
                    Editar Clase
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 -mt-4 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalClases(false)}
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
                <label>Nombre de la Materia</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setMateriasss(e.target.value)} defaultValue={materiasss} />
                <label>Maestros Disponible</label>
                <select
                  className="p-2 rounded-lg border border-gray-800"
                  defaultValue={maestroAsign}
                  onChange={(e) => {
                    const selectedMaestro = seleccionmateria.find((maestro) => maestro.nombre_maestro + " " + maestro.apellido_maestro === e.target.value);
                    const maestroSelect = asignTeacher.find((maestro) => maestro.nombre + " " + maestro.apellido === e.target.value);
  
                     if (selectedMaestro) {
                       setMaestroAsign(selectedMaestro.nombre_maestro + " " + selectedMaestro.apellido_maestro);
                       setId_user(selectedMaestro.id_user);
                       } else if (maestroSelect) {
                       setMaestroAsign(maestroSelect.nombre + " " + maestroSelect.apellido);
                       setId_user(maestroSelect.id_user);
                       setParaeliminar(maestroSelect.id_user);
                       setMaestroid("null");
                     } else if (!selectedMaestro) {
                        setMaestroid(id_user ? paraeliminar : "null" );
                        setId_user("null");
                      } else if (!maestroSelect) {
                        setMaestroid(id_user ? "null" : paraeliminar);
                        setId_user("null");
                      } 
                  }}
                >
                  <option>{maestroAsign === null + " " + null ? 'Seleccione un Profesor' : maestroAsign }</option>
                  {asignTeacher.map(({ nombre: nombreValue, apellido: apellidoVale }, key) => (
                    <option key={key} defaultValue={maestroAsign}>
                      {
                        nombreValue + " " + apellidoVale
                      }
                    </option>
                  ))}
                  <option>DEJAR SIN PROFESOR</option>
                </select>
                <div className="flex mt-6 mb-6 flex-col gap-6">
                  <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalClases(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editClases}
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

export default Clases;
