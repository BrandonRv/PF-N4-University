<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModelCreate.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/JWT.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/Key.php";
header('Content-Type: application/json');


class CreateController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ModelCreate();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function maestroCreate($token, $correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '1') {
                    $respon = $this->model->crearMaestro($correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign); //------ REALIZADO ------//
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            
        } catch (\Exception $e) {
            echo json_encode(['error' => "Datos Incorrectos."], 401);
        }    
    }

    public function studentCreate($token, $correo, $dni, $nombre, $apellido, $address, $cumpleanos)
    {
        try {
            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '1') {
                    $respon = $this->model->crearAlumno($correo, $dni, $nombre, $apellido, $address, $cumpleanos); //------ REALIZADO ------//
                    echo json_encode([
                        'respon' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
        } catch (\Exception $e) {
            echo json_encode(['error' => "Sección inválida."], 401);
        }    
    }

    public function materiaCreate($token, $id_user, $namemateria)
    {
        try {
            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '1') {
                    $respon = $this->model->crearMateria($id_user, $namemateria); //------ REALIZADO ------//
                    echo json_encode([
                        'responCali' => $respon[0],
                        'responUser' => $respon[1],
                        'error' => "Dato Actualizado." 
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
        } catch (\Exception $e) {
            echo json_encode(['error' => "Sección inválida."], 401);
        }    
    }


}