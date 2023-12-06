import { React, useState } from "react";
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
  const token = localStorage.getItem("token");
  const [modalComment, setModalComment] = useState(false);
  const [dni, setDni] = useState(usuario[0]?.DNI);
  const [nombre, setNombre] = useState(usuario[0]?.nombre);
  const [apellido, setApellido] = useState(usuario[0]?.apellido);
  const [correo, setCorreo] = useState(usuario[0]?.email);
  const [contrasena, setContrasena] = useState(null);
  const [direccion, setDireccion] = useState(usuario[0]?.address);
  const [cumpleanos, setCumpleanos] = useState(usuario[0]?.cumpleaños);
  const [respuesta, setRespuesta] = useState([]);


  // funcion para editar con fetch
  const editProfile = async () => {

    const res = await fetch("http://localhost:3000/backend/dashboard/profile/edit", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ token, dni, nombre, apellido, correo, contrasena, direccion, cumpleanos }), })
    const data = await res.json();
    setRespuesta(data);
    // Que devuelva un modal que diga Actualizaste tus Datos
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

  //console.log(nombre);

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
                  <PencilIcon
                    onClick={() => setModalComment(true)}
                    className="h-4 w-4 cursor-pointer text-blue-gray-500"
                  />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>
      {modalComment ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between  border-b border-solid border-blueGray-300 rounded-t">
                  <h4 className="text-2xl">
                    Edita tus datos
                  </h4>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 -mt-4 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalComment(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-0 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg text-gray-700 font-normal leading-relaxed">
                    Ingrese tus datos para actualizar, por favor.
                  </p>
                </div>
                <label>Matricula</label>
                <input type="number" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setDni(e.target.value)} defaultValue={usuario[0]?.DNI} />
                <label>Nombre</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setNombre(e.target.value)} defaultValue={usuario[0]?.nombre} />
                <label>Apellido</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setApellido(e.target.value)} defaultValue={usuario[0]?.apellido} />
                <label>Dirección</label>
                <input type="text" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setDireccion(e.target.value)} defaultValue={usuario[0]?.address} />
                <label>Cumpleaños</label>
                <input type="date" className="p-2 rounded-lg border border-gray-800" onChange={(e) => convertirFechaOriginal(e.target.value)} defaultValue={formatDate(usuario[0]?.cumpleaños)} />
                <label>Correo</label>
                <input type="email" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setCorreo(e.target.value)} defaultValue={usuario[0]?.email} />
                <label>Contraseña</label>
                <input type="password" className="p-2 rounded-lg border border-gray-800" onChange={(e) => setContrasena(e.target.value)} defaultValue="****" />
                <p className="text-center mt-4 text-green-600 text-sm">{respuesta?.error && <p>{respuesta?.error}</p>}</p>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    data-modal-hide="Modaless"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalComment(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-900 text-gray-100 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={editProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Profile;
