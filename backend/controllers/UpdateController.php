<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModelUpdate.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/JWT.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/Key.php";
header('Content-Type: application/json');


class UpdateController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ModelUpdate();
    }

    public function desencrypt($token, $table)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $usuario = $payload->usuario;
            $userID = $payload->id_user;
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;
            $idEntero = intval($userID);


            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else {
                if ($rol === '1') {

                    $this->model->verification($table, $idEntero);
                    echo json_encode([
                        'error' => 'Dato Actualizado.'
                    ]);

                } else if ($rol === "2") {

                    $this->model->verification($table,  $idEntero);
                    echo json_encode([
                        'error' => 'Dato Actualizado.'
                    ]);

                } else if ($rol === "3") {

                    $this->model->verification($table,  $idEntero);
                    echo json_encode([
                        'error' => 'Dato Actualizado.'
                    ]);

                } else {
                    echo json_encode([
                        'error' => 'Sin Autorizacion para Esta Accion'
                    ]);
                    return;
                }
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }
}
