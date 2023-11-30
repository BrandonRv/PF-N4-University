<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModelMain.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/JWT.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/config/php-jwt-6.9.0/src/Key.php";
header('Content-Type: application/json');


class PerfilController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ModelMain();
    }

    public function desencrypt($token)
    {
        try {

            $key = "clavecifrado";
            $payload = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($key, 'HS256'));
            $usuario = $payload->usuario;
            $userID = $payload->id_user;
            $rol = $payload->rol;
            $vencimiento = $payload->vencimiento;

            if ($vencimiento < time()) {
                // El token ha caducado
                echo json_encode(['error' => 'Sección Caducada.'], 401);
            } else {
                if ($rol === '1') {

                    $profile = $this->model->profileInfo($userID);
                    $permission = $this->model->permission();
                    $teacherAll = $this->model->teacherAll();
                    $alumnosAll = $this->model->alumnosAll();
                    $materiasInfo = $this->model->subjectsAll();

                    if ($profile[0]["condicion"] === '0') {
                        echo json_encode([
                            'error' => 'Sin Autorización'
                        ]);
                    } else {
                        echo json_encode([
                            'nombre' => $usuario,
                            'rolUser' => $rol,
                            'perfilInfo' => $profile,
                            'permisosInfo' => $permission,
                            'maestrosAll' => $teacherAll,
                            'studentAll' => $alumnosAll,
                            'subjectsInfo' => $materiasInfo,
                            'categoria' => 'Administrador',
                            'error' => 'No'
                        ]);
                    }
                } else if ($rol === "2") {

                    $profile = $this->model->profileInfo($userID);
                    $maestroAlumno = $this->model->studentTeacher($userID);

                    if ($profile[0]["condicion"] === '0') {
                        echo json_encode([
                            'error' => 'Sin Autorización'
                        ]);
                    } else {
                        echo json_encode([
                            'nombre' => $usuario,
                            'rolUser' => $rol,
                            'perfilInfo' => $profile,
                            'studentMaestro' => $maestroAlumno,
                            'categoria' => 'Maestro',
                            'error' => 'No'
                        ]);
                    }
                } else if ($rol === "3") {

                    $profile = $this->model->profileInfo($userID); // calificacionesAll
                    $verRatings = $this->model->calificacionesAll($userID);
                    $verMaterias = $this->model->materiaNOTinsert($userID);

                    if ($profile[0]["condicion"] === '0') {
                        echo json_encode([
                            'error' => 'Sin Autorización'
                        ]);
                    } else {
                        echo json_encode([
                            'nombre' => $usuario,
                            'rolUser' => $rol,
                            'perfilInfo' => $profile,
                            'seeRatings' =>  $verRatings,
                            'seeMaterias' => $verMaterias,
                            'categoria' => 'Alumno',
                            'error' => 'No'
                        ]);
                    }
                } else {
                    echo json_encode([
                        'error' => 'Sin rol Asignado.'
                    ]);
                    return;
                }
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Sección inválida.'], 401);
        }
    }
}
