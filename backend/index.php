<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/LoginController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/PerfilController.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/controllers/UpdateController.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

$route = explode("?", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];
$loginController = new LoginController();
$perfilController = new PerfilController();
$UpdateController = new UpdateController();

if ($method === "POST") {

    switch ($route[0]) {
        case '/backend/login':
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

        case '/backend/dashboard':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        case '/backend/dashboard/profile':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        default:
            echo "NO ENCONTRAMOS LA RUTA.";
            break;
    }
}

if ($method === "GET") {
    switch ($route[0]) {

        case '/backend/index.php':

            echo "Este es el Index";
            break;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

        case '/backend/dashboard/permission/edit':

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
                $maestroinsert = null;
                $UpdateController->adminUpdate($token, $update, $id_user, $id_rol, $correo, $condicion, $nombre, $apellido, $address, $cumpleanos, $dni, $namemateria, $maestroinsert);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/permission/delete':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        case '/backend/dashboard/teachers/edit':
            
            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["correo"]) && isset($getData["nombre"]) && isset($getData["apellido"]) && isset($getData["address"]) && isset($getData["cumpleanos"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $correo = $getData["correo"];
                $nombre = $getData["nombre"];
                $apellido = $getData["apellido"];
                $address = $getData["address"];
                $cumpleanos = $getData["cumpleanos"];
                $id_rol = null;
                $condicion = null;
                $dni = null;
                $namemateria = null;
                $maestroinsert = null;
                $UpdateController->adminUpdate($token, $update, $id_user, $id_rol, $correo, $condicion, $nombre, $apellido, $address, $cumpleanos, $dni, $namemateria, $maestroinsert);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/teachers/delete':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        case '/backend/dashboard/students/edit':

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
                $maestroinsert = null;
                $condicion = null;
                $UpdateController->adminUpdate($token, $update, $id_user, $id_rol, $correo, $condicion, $nombre, $apellido, $address, $cumpleanos, $dni, $namemateria, $maestroinsert);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/students/delete':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        case '/backend/dashboard/classes/edit':

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["namemateria"]) && isset($getData["maestroinsert"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $namemateria = $getData["namemateria"];
                $maestroinsert = $$getData["maestroinsert"];
                $nombre = null;
                $id_rol = null;
                $apellido = null;
                $address = null;
                $cumpleanos = null;
                $dni = null;
                $correo = null;
                $condicion = null;
                $UpdateController->adminUpdate($token, $update, $id_user, $id_rol, $correo, $condicion, $nombre, $apellido, $address, $cumpleanos, $dni, $namemateria, $maestroinsert);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;


        case '/backend/dashboard/classes/delete':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE MAESTROS ------------------------------------ //
    ////////////////////////////////////////////////////////////////////////////////////////////////


        case '/backend/dashboard/weighing/edit':

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["id_rol"]) && isset($getData["correo"]) && isset($getData["condicion"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $id_rol = $getData["id_rol"];
                $correo = $getData["correo"];
                $condicion = $getData["condicion"];
                $UpdateController->teachersUpdate($token, $update, $id_user, $id_rol, $correo, $condicion);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/weighing/delete':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

            
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

        case '/backend/dashboard/manageclasses/insert':

            $getData = json_decode(file_get_contents("php://input"), true);

            if (isset($getData["token"]) && isset($getData["update"]) && isset($getData["id_user"]) && isset($getData["id_rol"]) && isset($getData["correo"]) && isset($getData["condicion"])) {
                $token = $getData["token"];
                $update = $getData["update"];
                $id_user = $getData["id_user"];
                $id_rol = $getData["id_rol"];
                $correo = $getData["correo"];
                $condicion = $getData["condicion"];
                $UpdateController->alumnoUpdate($token, $update, $id_user, $id_rol, $correo, $condicion);
            } else {
                http_response_code(400);
                echo "Datos de usuario Inválidos en la Solicitud.";
            }
            break;

        case '/backend/dashboard/manageclasses/remove':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $perfilController->desencrypt($token);
            break;

        default:
            echo "NO ENCONTRAMOS LA RUTA.";
            break;
    }
}
