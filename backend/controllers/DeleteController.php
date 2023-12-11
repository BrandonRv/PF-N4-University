<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModelDelete.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/JWT.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/Key.php";
header('Content-Type: application/json');


class DeleteController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ModelDelete();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function maestroDelete($token, $id_user)
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
                    $respon = $this->model->deleteMaestro($id_user); //------ REALIZADO ------//
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
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }    
    }

    public function studentDelete($token, $id_user)
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
                    $respon = $this->model->deleteAlumno($id_user); //------ REALIZADO ------//
                    echo json_encode([
                        'responCali' => $respon[0],
                        'responUser' => $respon[1],
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

    public function materiaDelete($token, $id_materia)
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
                    $respon = $this->model->eliminarMateria($id_materia); //------ REALIZADO ------//
                    echo json_encode([
                        'responCali' => $respon[0],
                        'responUser' => $respon[1],
                        'responMateria' => $respon[2],
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


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function alumnoDelete($token, $id_cali) //------ REALIZADO ------//
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '3') {
                    $respon = $this->model->deleteMateria($id_cali); //------ REALIZADO ------//
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
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }
}