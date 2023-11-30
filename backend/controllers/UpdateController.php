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


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function adminUpdate($token, $update, $id_user, $id_rol, $correo, $condicion)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($update === 'profile') {

                if ($rol === '1') {
                    $respon = $this->model->profile($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'permisos') {

                if ($rol === '1') {
                    $respon = $this->model->permission($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'maestros') {

                if ($rol === '1') {
                    $respon = $this->model->maestros($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'alumnos') {

                if ($rol === '1') {
                    $respon = $this->model->alumnos($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'clases') {

                if ($rol === '1') {
                    $respon = $this->model->clases($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE MAESTROS ------------------------------------ //
    ////////////////////////////////////////////////////////////////////////////////////////////////


    public function teachersUpdate($token, $update, $id_user, $id_rol, $correo, $condicion)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            //$usuario = $payload->usuario;
            //$userID = $payload->id_user;
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;
            //$idEntero = intval($userID);


            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);

            } else if ($update === 'profile') {

                if ($rol === '2') {
                    $respon = $this->model->profile($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'assignment') {

                if ($rol === '2') {
                    $respon = $this->model->assignment($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            }

        } catch (\Exception $e) {
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function alumnoUpdate($token, $update, $id_user, $id_rol, $correo, $condicion)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            //$usuario = $payload->usuario;
            //$userID = $payload->id_user;
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;
            //$idEntero = intval($userID);


            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($update === 'profile') {

                if ($rol === '3') {
                    $respon = $this->model->profile($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } else if ($update === 'maestros') {

                if ($rol === '3') {
                    $respon = $this->model->insert($id_user, $id_rol, $correo, $condicion);
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            } 
            
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }
}
