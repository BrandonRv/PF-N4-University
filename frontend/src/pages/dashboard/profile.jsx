import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import avatar1 from "../../assets/user.png"
import { ProfileInfoCard } from "@/widgets/cards";
import { useUniversityContext } from "../../context/UniversityProvider";

export function Profile() {

const { usuario } = useUniversityContext();

//const token = localStorage.getItem("token");

// funcion para editar con fetch
// const editarDatos = async () => {

//   const res = await fetch("http://localhost:3000/backend/dashboard", { method: "GET", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token }), })
//   const data1 = await res.json();
// }

// funcion para eliminar con fetch 
// const eliminarDatos = async () => {

//   const res = await fetch("http://localhost:3000/backend/dashboard", { method: "GET", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token }), })
//   const data1 = await res.json();
// }


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={avatar1}
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {usuario[0]?.nombre}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Informacion de mi Perfil
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
          <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Opciones de Cuenta
              </Typography>
              <div className="flex flex-col gap-12">
                  <div>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      cuenta settings
                    </Typography>
                    <div className="flex mt-6 mb-6 flex-col gap-6">
                        <Switch
                          label="Recibir notificaciones por correo"
                          defaultChecked={false}
                          labelProps={{
                            className: "text-sm font-normal ml-3 text-blue-gray-500",
                          }}
                        />
                    </div>
                    <div className="flex mt-6 mb-6 flex-col gap-6">
                        <Switch
                          label="Notificaciones de alumnos de mi clase."
                          defaultChecked={false}
                          labelProps={{
                            className: "text-sm font-normal ml-4 text-blue-gray-500",
                          }}
                        />
                    </div>
                    <div className="flex mt-6 mb-6 flex-col gap-6">
                        <Switch
                          label="Notificaciones de clases nuevas"
                          defaultChecked={false}
                          labelProps={{
                            className: "text-sm font-normal ml-3 text-blue-gray-500",
                          }}
                        />
                    </div>
                  </div>
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Information"
              description={`Hi I'm ${usuario[0]?.nombre}, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`}
              details={{
                "full name": usuario[0]?.nombre + " " + usuario[0]?.apellido,
                dni: usuario[0]?.DNI,
                email: usuario[0]?.email,
                cumpleaños: usuario[0]?.cumpleaños,
                direccion: usuario[0]?.address,
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
