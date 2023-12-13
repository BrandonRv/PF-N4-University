<?php

class ModelCreate
{

    private $db;
    protected $tableUser = "usuarios";
    protected $tableRol = "rol";
    protected $tableMateria = "materias";
    protected $tableCalificaciones = "calificacion_observaciones";

    public function __construct()
    {
        $config = include($_SERVER["DOCUMENT_ROOT"] . "/backend/config/database.php");

        try {
            $this->db = new mysqli(
                $config["host"],
                $config["username"],
                $config["password"],
                $config["dbname"],
                $config["port"]
            );
        } catch (mysqli_sql_exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function crearMaestro($correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign)
    {
        $contrasena = '$2y$10$JgGkWxYk8BZLKtMKh89sYO3c8d0SQEzy5dw20yn9bcizHfLCmT01W';
        $res = $this->db->query("INSERT INTO usuarios (nombre, apellido, email, password, address, cumpleaños, maestro, condicion, DNI, id_rol, foto) VALUES ('$nombre','$apellido','$correo','$contrasena','$address','$cumpleanos',($maestroasign), '1', NULL, '2', NULL)");
        return $res;
    }

    public function crearAlumno($correo, $dni, $nombre, $apellido, $address, $cumpleanos)
    {
        $contrasena = '$2y$10$JgGkWxYk8BZLKtMKh89sYO3c8d0SQEzy5dw20yn9bcizHfLCmT01W';
        $res = $this->db->query("INSERT INTO {$this->tableUser} (nombre, apellido, email, password, address, cumpleaños, condicion, DNI, id_rol, foto) VALUES ('$nombre','$apellido','$correo','$contrasena','$address','$cumpleanos', '1', ($dni), '3', NULL)");
        return $res;
    }

    public function crearMateria($id_user, $namemateria)
    {
        $res = $this->db->query("INSERT INTO {$this->tableMateria} (name_materia) VALUES ('$namemateria')");
        $idmateria = $this->db->insert_id;
        $res2 = $this->db->query("UPDATE {$this->tableUser} SET maestro = '$idmateria' WHERE id_user = ($id_user)"); 
        return array($res, $res2);
    }
}
