<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/LoginController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/PerfilController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/UpdateController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/DeleteController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/CreateController.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

$route = explode("?", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];
$loginController = new LoginController();
$perfilController = new PerfilController();
$updateController = new UpdateController();
$deleteController = new DeleteController();
$createController = new CreateController();

if ($method === "GET") {
    switch ($route[0]) {

        case '/backend/index.php':

            echo "Este es el Index";
            break;

        default:
            echo "NO ENCONTRAMOS LA RUTA.";
            break;
    }
}

if ($method === "POST") {

    switch ($route[0]) {
        case '/backend/login': //--------------------------------------------------------- REALIZADO --------------------------------//

            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["correo"]) && isset($postData["contrasena"])) {
                $correo = $postData["correo"];
                $contrasena = $postData["contrasena"];
                $loginController->login($correo, $contrasena);
            } else {
                http_response_code(400);
                echo "Datos de usuario incompletos en la solicitud.";
            }
            break;

        case '/backend/dashboard': //--------------------------------------------------------- REALIZADO --------------------------------//

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        case '/backend/dashboard/profile/edit': //--------------------------------------------------------- REALIZADO --------------------------------//

            $postData = json_decode(file_get_contents("php://input"), true);
            if (isset($postData["token"]) && isset($postData["dni"]) && isset($postData["nombre"]) && isset($postData["apellido"]) && isset($postData["correo"]) && isset($postData["contrasena"]) && isset($postData["direccion"]) && isset($postData["cumpleanos"])) {
                $token = $postData["token"];
                $dni = $postData["dni"];
                $nombre = $postData["nombre"];
                $apellido = $postData["apellido"];
                $correo = $postData["correo"];
                $contrasena = $postData["contrasena"];
                $direccion = $postData["direccion"];
                $cumpleanos = $postData["cumpleanos"];
                $updateController->profilEdit($token, $dni, $nombre, $apellido, $correo, $contrasena, $direccion, $cumpleanos);
            } else {
                http_response_code(400);
                echo "Datos de usuario incompletos en la solicitud.";
            }
            break;

            ////////////////////////////////////////////////////////////////////////////////////////////////
            // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
            ////////////////////////////////////////////////////////////////////////////////////////////////

        case '/backend/dashboard/permission/edit': //-------------------------------------------------------- REALIZADO --------------------------//

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["id_rol"]) && isset($getData["correo"]) && isset($getData["condicion"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $id_rol = $getData["id_rol"];
                $correo = $getData["correo"];
                $condicion = $getData["condicion"];
                $nombre = null;
                $apellido = null;
                $address = null;
                $cumpleanos = null;
                $dni = null;
                $namemateria = null;
                $id_maestro = null;
                $maestroasign = null;
                $id_materia = null;
                $updateController->adminUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro, $nombre, $id_rol, $apellido, $address, $cumpleanos, $dni, $correo, $condicion, $maestroasign);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/teachers/edit': //-------------------------------------------------------- REALIZADO --------------------------//

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["correo"]) && isset($getData["nombre"]) && isset($getData["apellido"]) && isset($getData["address"]) && isset($getData["cumpleanos"]) && isset($getData["asignancion"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $correo = $getData["correo"];
                $nombre = $getData["nombre"];
                $apellido = $getData["apellido"];
                $address = $getData["address"];
                $cumpleanos = $getData["cumpleanos"];
                $maestroasign = $getData["asignancion"];
                $id_rol = null;
                $condicion = null;
                $dni = null;
                $namemateria = null;
                $id_maestro = null;
                $id_materia = null;
                $updateController->adminUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro, $nombre, $id_rol, $apellido, $address, $cumpleanos, $dni, $correo, $condicion, $maestroasign);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/students/edit': //--------------------------------------------------------- REALIZADO --------------------------------//

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["dni"]) && isset($getData["correo"]) && isset($getData["nombre"]) && isset($getData["apellido"]) && isset($getData["address"]) && isset($getData["cumpleanos"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $correo = $getData["correo"];
                $dni = $getData["dni"];
                $nombre = $getData["nombre"];
                $apellido = $getData["apellido"];
                $address = $getData["address"];
                $cumpleanos = $getData["cumpleanos"];
                $id_rol = null;
                $namemateria = null;
                $id_maestro = null;
                $condicion = null;
                $maestroasign = null;
                $id_materia = null;
                $updateController->adminUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro, $nombre, $id_rol, $apellido, $address, $cumpleanos, $dni, $correo, $condicion, $maestroasign);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/classes/edit': //--------------------------------------------------------- REALIZADO --------------------------------//

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["materiaid"]) && isset($getData["materiasss"]) && isset($getData["maestroid"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $id_materia = $getData["materiaid"];
                $namemateria = $getData["materiasss"];
                $id_maestro = $getData["maestroid"];
                $nombre = null;
                $id_rol = null;
                $apellido = null;
                $address = null;
                $cumpleanos = null;
                $dni = null;
                $correo = null;
                $condicion = null;
                $maestroasign = null;
                $updateController->adminUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro, $nombre, $id_rol, $apellido, $address, $cumpleanos, $dni, $correo, $condicion, $maestroasign);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/teachers/delete':

            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["token"]) && isset($postData["id_user"])) {
                $token = $postData["token"];
                $id_user = $postData["id_user"];
                $deleteController->maestroDelete($token, $id_user);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/students/delete':

            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["token"]) && isset($postData["id_user"])) {
                $token = $postData["token"];
                $id_user = $postData["id_user"];
                $deleteController->studentDelete($token, $id_user);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/classes/delete':

            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["token"]) && isset($postData["materiaid"])) {
                $token = $postData["token"];
                $id_materia = $postData["materiaid"];
                $deleteController->materiaDelete($token, $id_materia);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/teachers/create':

            $putData = json_decode(file_get_contents("php://input"), true);

            if (isset($putData["token"]) && isset($putData["correo"]) && isset($putData["nombre"]) && isset($putData["apellido"]) && isset($putData["address"]) && isset($putData["cumpleanos"]) && isset($putData["asignancion"])) {
                $token = $putData["token"];
                $correo = $putData["correo"];
                $nombre = $putData["nombre"];
                $apellido = $putData["apellido"];
                $address = $putData["address"];
                $cumpleanos = $putData["cumpleanos"];
                $maestroasign = $putData["asignancion"];
                $createController->maestroCreate($token, $correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
            }
            break;

        case '/backend/dashboard/students/create':

            $putData = json_decode(file_get_contents("php://input"), true);

            if (isset($putData["token"]) && isset($putData["dni"]) && isset($putData["correo"]) && isset($putData["nombre"]) && isset($putData["apellido"]) && isset($putData["address"]) && isset($putData["cumpleanos"])) {
                $token = $putData["token"];
                $correo = $putData["correo"];
                $dni = $putData["dni"];
                $nombre = $putData["nombre"];
                $apellido = $putData["apellido"];
                $address = $putData["address"];
                $cumpleanos = $putData["cumpleanos"];
                $createController->studentCreate($token, $correo, $dni, $nombre, $apellido, $address, $cumpleanos);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
            }
            break;

        case '/backend/dashboard/classes/create':

            $putData = json_decode(file_get_contents("php://input"), true);

            if (isset($putData["token"]) && isset($putData["id_user"]) && isset($putData["materiasss"])) { 
                $token = $putData["token"];
                $id_user =$putData["id_user"];
                $namemateria = $putData["materiasss"];
                $createController->materiaCreate($token, $id_user, $namemateria);
            } else {
                echo json_encode(['error' => 'Sección inválida.'], 400);
            }
            break;


            ////////////////////////////////////////////////////////////////////////////////////////////////
            // -------------------------------- PERMISOS DE MAESTROS ------------------------------------ //
            ////////////////////////////////////////////////////////////////////////////////////////////////

        case '/backend/dashboard/weighing/edit':

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["id_cali"])) {
                $token = $getData["token"];
                $id_cali = $getData["id_cali"];
                $calificacion = $getData["calificacion"];
                $mensaje = $getData["mensaje"];
                $updateController->teachersUpdate($token, $id_cali, $calificacion, $mensaje);
            } else {
                echo json_encode(['error' => "Sección inválida."], 400);
                // http_response_code(400);
                // echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break; 

            ////////////////////////////////////////////////////////////////////////////////////////////////
            // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
            ////////////////////////////////////////////////////////////////////////////////////////////////

        case '/backend/dashboard/manageclasses/insert': //--------------------------------------------------------- REALIZADO --------------------------------//

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["id_materia"])) {
                $token = $getData["token"];
                $id_materia = $getData["id_materia"];
                $updateController->alumnoUpdate($token, $id_materia);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/manageclasses/remove':

            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["token"]) && isset($postData["id_cali"])) {
                $token = $postData["token"];
                $id_cali = $postData["id_cali"];
                $deleteController->alumnoDelete($token, $id_cali);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        default:
            echo json_encode(['error' => "NO EXISTE LA RUTA."], 400);
            break;
    }
}

if ($method === "PUT") {
    switch ($route[0]) {

        default:
            echo "NO ENCONTRAMOS LA RUTA.";
            break;
    }
}
