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


    public function profilEdit($token, $dni, $nombre, $apellido, $correo, $contrasena, $direccion, $cumpleanos)
    {
        try {
            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $userID = $payload->id_user;
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;
            $rolEntero = intval($rol);

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rolEntero <= 0) {
                echo json_encode([
                    'error' => 'No tiene autorizacion para realizar esta operacion'
                ]);
            } else if ($rolEntero <= 3) {
                    $respon = $this->model->profile($userID, $dni, $nombre, $apellido, $correo, $contrasena, $direccion, $cumpleanos);
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
            echo json_encode([
                'error' => 'Sección inválida.',
                'errorExcepción' => $e
            ], 401);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function adminUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro, $nombre, $id_rol, $apellido, $address, $cumpleanos, $dni, $correo, $condicion, $maestroasign)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($update === 'permisos') {

                if ($rol === '1') {
                    $respon = $this->model->permission($id_user, $id_rol, $correo, $condicion);  //------------------------ REALIZADO ------------------//
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
                    $respon = $this->model->maestros($id_user, $correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign); //------ REALIZADO ------//
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
                    $respon = $this->model->alumnos($id_user, $dni, $correo, $nombre, $apellido, $address, $cumpleanos); //------ REALIZADO ------//
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
                    $respon = $this->model->clases($id_user, $id_materia, $namemateria, $id_maestro); //------ REALIZADO ------//
                    echo json_encode([
                        'respon' => $respon[0],
                        'respon1' => $respon[1],
                        'respon2' => $respon[2],
                        'error' => 'Datos Actualizados.'
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


    public function teachersUpdate($token, $id_cali, $calificacion, $mensaje) //------ REALIZADO ------//
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '2') {
                    $respon = $this->model->assignment($id_cali, $calificacion, $mensaje); //------ REALIZADO ------//
                    echo json_encode([
                        'respuesta' => $respon,
                        'error' => 'Dato Actualizado.'
                    ]);
                } else {
                    echo json_encode([
                        'error' => 'No tiene autorizacion para realizar esta operacion'
                    ]);
                }
            
        } catch (\Exception $e) {
            echo json_encode(['error' => "Sección inválida. {$calificacion} "], 401);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function alumnoUpdate($token, $id_materia) //------ REALIZADO ------//
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $rol = $payload->rol;
            $userID = $payload->id_user;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else if ($rol === '3') {
                    $respon = $this->model->insert($id_materia, $userID); //------ REALIZADO ------//
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

/* NOTA IMPORTANTE TODO ESTA LOGICA SE PUDO DESARROLLAR EN FUNCIONES SEPARADAS YA QUE SE PUEDE HACER LO SIGUIENTE:

//----------- Para Administrador -----------//

*** public function adminPermisoUpdate($token, $update, $id_user, $id_rol, $correo, $condicion)
{
    // CODIGO AQUI
}

*** public function adminMaestroUpdate($token, $update, $id_user, $correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign)
{
    // CODIGO AQUI
}

*** public function adminAlumnoUpdate($token, $update, $id_user, $dni, $correo, $nombre, $apellido, $address, $cumpleanos)
{
    // CODIGO AQUI
}

*** public function adminClasesUpdate($token, $update, $id_user, $id_materia, $namemateria, $id_maestro)
{
    // CODIGO AQUI
}

//----------- Para Maestros -----------//

*** public function teachersUpdate($token, $id_cali, $calificacion, $mensaje)
{
    // CODIGO AQUI
}

//----------- Para Alumnos -----------//

*** public function alumnoUpdate()
{
    // CODIGO AQUI
}

*/