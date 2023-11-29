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

  const { permisos } = useUniversityContext();

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
                ({ email, nombre_del_rol, condicion }, key) => {
                  const className = `py-3 px-5 ${key === permisos.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={email}>
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
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
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
    </div>
  );
}

export default Calificaciones;
