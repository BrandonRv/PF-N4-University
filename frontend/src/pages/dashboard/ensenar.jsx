import { React, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import avatar1 from "../../assets/user.png"
import { useUniversityContext } from "../../context/UniversityProvider";

export function Ensenar() {

  const { maestroClass } = useUniversityContext();
  const [modalCali, setModalCali] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [id_cali, setId_cali] = useState("null");
  const [calificacion, setCalificacion] = useState("null");
  const [mensaje, setMensaje] = useState("null");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const token = localStorage.getItem("token");

  //funcion para editar con fetch
  const editCalificaciones = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/weighing/edit", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, id_cali, calificacion, mensaje }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 2000);
    // Devuelve una Respuesta True si se Realizo correctamente la Actualizacion de Datos
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Alumnos de la clase {maestroClass[0]?.name_materia === undefined ? "(No Tienes Clase Asignada)" : maestroClass[0]?.name_materia}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["nombre de alumnos", "calificación", "mensajes", "acciones"].map((el) => (
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
              {maestroClass.map(
                ({ nombre_alumno, apellido_alumno, calificacion, observaciones, id_cali }, key) => {
                  const className = `py-3 px-5 ${key === maestroClass.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={nombre_alumno}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {nombre_alumno === null ? null : <Avatar src={avatar1} alt="usuario.png" size="sm" variant="rounded" />}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {nombre_alumno === null ? null : nombre_alumno + " " + apellido_alumno}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {nombre_alumno === null ? null : calificacion === null ? <Chip variant="gradient" color="blue-gray" value="Sin calificación" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> : (calificacion)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {nombre_alumno === null ? null : observaciones === null ? (observaciones) : <Chip variant="gradient" color="blue" value={observaciones} className="py-0.5 px-2 text-[11px] font-medium w-fit" />}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex">
                          <Typography
                            onClick={() => { 
                              setId_cali(id_cali);
                              setNombre(nombre_alumno);
                              setApellido(apellido_alumno);
                              setCalificacion(calificacion); 
                              setMensaje(observaciones);
                              setModalCali(true); 
                            }}
                            className="text-xs font-semibold text-blue-gray-600 cursor-pointer"
                          >
                            {nombre_alumno === null ? null : <i class="fa-solid fa-notes-medical fa-xl"></i>}
                          </Typography>
                          <Typography
                            onClick={() => { 
                              setId_cali(id_cali);
                              setNombre(nombre_alumno);
                              setApellido(apellido_alumno);
                              setCalificacion(calificacion); 
                              setMensaje(observaciones); 
                              setModalComment(true);  
                            }}
                            className="text-xs font-semibold ml-4 text-blue-gray-600 cursor-pointer"
                          >
                            {nombre_alumno === null ? null : <i class="fa-solid fa-comment fa-xl"></i>}
                          </Typography>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {modalCali ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h4 className="text-2xl">
                    Añadir Calificación
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalCali(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Ingrese la Calificación del Alumno {nombre + " " + apellido}
                  </p>
                </div>
                <input type="number" min="1" max="100" placeholder="1 al 100" className="p-4 rounded-lg border border-gray-800" onChange={(e) => setCalificacion(e.target.value)} defaultValue={calificacion} />
                <div className="flex mt-6 mb-6 flex-col gap-6">
                  <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalCali(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editCalificaciones}
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
      {modalComment ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h4 className="text-2xl">
                    Añadir Mensaje
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalComment(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Ingresa un Mensaje u Observación para {nombre + " " + apellido}
                  </p>
                </div>
                <input type="text" className="p-4 rounded-lg border border-gray-800" onChange={(e) => setMensaje(e.target.value)} placeholder="Ingrese un Mensaje"/>
                <div className="flex mt-6 mb-6 flex-col gap-6">
                  <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalComment(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editCalificaciones}
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

export default Ensenar;







