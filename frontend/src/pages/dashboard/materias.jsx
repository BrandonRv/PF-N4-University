import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { useUniversityContext } from "../../context/UniversityProvider";

export function Materias() {

  const { calificaciones, faltante } = useUniversityContext();
  const [id_materia, setId_materia] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [id_cali, setId_cali] = useState("null")
  const token = localStorage.getItem("token");

  // funcion para insertar con fetch
  const insertarMateria = async () => {

    for (let i = 0; i < id_materia.length; i++) {
      let elemento = id_materia[i];

      const res = await fetch("http://localhost:3000/backend/dashboard/manageclasses/insert", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, id_materia: elemento }), });
      const data = await res.json();
      setRespuesta(data);
    }
    setId_materia([]);
    setTimeout(() => {
      setRespuesta("");
    }, 1200);
    //window.location.href = "/dashboard/materias";
  };

  // funcion para Dar de baja con fetch
  const darBaja = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/manageclasses/remove", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, id_cali }), })
    const data = await res.json();
    setRespuesta(data);
    setTimeout(() => {
      setRespuesta('');
    }, 1200);
  }

  const handleCheckboxChange = (id_matrixx, checked) => {

    if (checked === true) {
      setId_materia(id_materia.concat(id_matrixx));
    } else {
      setId_materia(id_materia.filter((item) => item !== id_matrixx));
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Esquema de Clases
          </Typography>
        </CardHeader>
        <div className="h-1 mb-5">
          <p className="text-center text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
        </div>
        <CardBody className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
          <table className="w-full min-w-[640px] table-auto dataTable-table">
            <thead>
              <tr>
                {["materia", "darse de baja"].map((el) => (
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
            {calificaciones[0] === undefined ? "No tienes ninguna Materia Aqui" : (
              <tbody>
                {calificaciones.map(
                  ({ id_materia, name_materia, id_cali }, key) => {
                    const className = `py-3 px-5 ${key === calificaciones.length - 1
                      ? ""
                      : "border-b border-r border-blue-gray-50"
                      }`;
                    return (
                      <tr key={id_materia}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name_materia}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            className="text-xs cursor-pointer font-semibold pl-10 text-blue-gray-600"
                            onClick={() => {
                              setId_cali(id_cali);
                              darBaja();
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" height="18" width="14" viewBox="0 0 384 512">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            )}
          </table>
          <card className="border-blue-gray-50 ml-2 bg-white">
            <div class="w-full border-b p-2 border-blue-gray-50 items-center ">
              <Typography variant="small" className="text-[11px] items-center font-bold uppercase text-blue-gray-400" >Materias para inscribir</Typography>
            </div>
            <form className="border flex flex-col w-full pl-4  md:text-base text-xs md:overflow-y-scroll md:overflow-x-hidden overflow-scroll">
              {faltante[0] === undefined ? "No hay mas materias para Agregar" : (
                <label className="cursor-pointer hover:bg-slate-100 w-full md:py-2 py-1 justify-start items-center">
                  {faltante.map(
                    ({ id_materia, name_materia }, key) => {
                      return (
                        <label htmlFor={`mi-checkbox-${id_materia}`} key={key} className="p-1 flex cursor-pointer justify-start items-center">
                          <input
                            id={`mi-checkbox-${id_materia}`}
                            className="mii-checkboxx"
                            type="checkbox"
                            defaultChecked={false}
                            onChange={(e) => {
                              handleCheckboxChange(id_materia, e.target.checked);
                            }}
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold ml-2 "
                          >
                            {name_materia}
                          </Typography>
                        </label>
                      )
                    }
                  )}
                </label>
              )}
              <div className="h-4 mb-6">
                <p className="mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
              </div>
              <button
                className="md:mt-4 mt-2 w-fit dark:bg-gray-900 dark:hover:bg-gray-800 bg-[#007aff] hover:bg-blue-500 text-white  py-2 px-4 rounded-lg"
                type='button'
                onClick={insertarMateria}
              >Inscribirse</button>
            </form>
          </card>
        </CardBody>
      </Card>
    </div>
  );
}

export default Materias;
