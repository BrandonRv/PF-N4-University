import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import avatar1 from "../../assets/user.png"
import { useUniversityContext } from "../../context/UniversityProvider";

export function Materias() {

  const { calificaciones, faltante  } = useUniversityContext();

  // mb-12 flex gap-12 flex-col
  //overflow-x-scroll px-0 pt-0 pb-2

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Esquema de Clases
          </Typography>
        </CardHeader>
        <CardBody className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
          
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["materia", "darsede baja"].map((el) => (
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
              {calificaciones.map(
                ({ id_materia, name_materia }, key) => {
                  const className = `py-3 px-5 ${key === calificaciones.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
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
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          X
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>


          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["materia para inscribir"].map((el) => (
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
              {faltante.map(
                ({ id_materia, name_materia }, key) => {
                  const className = `py-3 px-5 ${key === faltante.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
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
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Materias;
