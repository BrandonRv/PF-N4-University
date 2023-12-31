import React from "react";
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

export function Calificaciones() {

  const { calificaciones } = useUniversityContext();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Calificaciones y mensajes de tus Clases
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["nombre de clase", "calificacion", "mensaje"].map((el) => (
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
                ({ id_materia, name_materia, calificacion, observaciones }, key) => {
                  const className = `py-3 px-5 ${key === calificaciones.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={id_materia}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={avatar1} alt="usuario.png" size="sm" variant="rounded" />
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
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {calificacion === null ?  <Chip variant="gradient" color="blue-gray" value="Sin calificación" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> : (calificacion) }
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {observaciones ===  null ? <Chip variant="gradient" color="blue" value="No hay mensajes" className="py-0.5 px-2 text-[11px] font-medium w-fit" /> : (observaciones) }
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
    </div>
  );
}

export default Calificaciones;
