<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModelLogin.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/JWT.php"; // Libreria para generar token de Seccion
header('Content-Type: application/json');

class LoginController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ModelLogin();
    }

    public function login($correo, $contrasena)
    {
        $usuario = $this->model->where("email", "=", $correo);

        if (count($usuario) > 0) {

            if (password_verify($contrasena, $usuario[0]["password"])) { // Para pruebas $contrasena === $usuario[0]["password"]
                $key = "clavecifrado";
                $payload = array(
                    "usuario" => $usuario[0]["email"],
                    "id_user" => $usuario[0]["id_user"],
                    "rol" => $usuario[0]["id_rol"],
                    "vencimiento" => time() + 3600
                );

                $token = \Firebase\JWT\JWT::encode($payload, $key, 'HS256');
                $response = array(
                    "token" => $token  //"dashboard" => "/backend/dashboard"
                );
                http_response_code(200);
                echo json_encode($response);
            } else {
                http_response_code(401);
                $response1 = array(
                    "passIncorrecto" => "Contraseña incorrecta"
                );
                echo json_encode($response1);
            }
        } else {
            http_response_code(404);
            $response2 = array(
                "userInvalido" => "Usuario no existe"
            );
            echo json_encode($response2);
        }
    }
}
