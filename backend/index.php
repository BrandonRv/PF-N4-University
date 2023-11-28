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


        case '/backend/update':

            $authHeader = $_SERVER["HTTP_AUTHORIZATION"];
            $token = str_replace("Bearer ", "", $authHeader);
            $postData = json_decode(file_get_contents("php://input"), true);

            if (isset($postData["table"])) {
                $table = $postData["table"];
                $UpdateController->desencrypt($token, $table);
        } else {
            http_response_code(400);
            echo "Datos de usuario Inválidos en la Solicitud.";
        }
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

        case '/backend/dashboard':

            echo "Este es el dashboard";
            break;

        default:
            echo "NO ENCONTRAMOS LA RUTA.";
            break;
    }
}
