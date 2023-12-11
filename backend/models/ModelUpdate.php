<?php

class ModelUpdate
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

    public function profile($userID, $dni, $nombre, $apellido, $correo, $contrasena, $direccion, $cumpleanos) 
    {
        $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);
        $res = $this->db->query("UPDATE usuarios SET DNI = '$dni', nombre = '$nombre', apellido = '$apellido', email = '$correo', password = '$hashed_password', address ='$direccion', cumpleaños = '$cumpleanos' WHERE id_user = '$userID'");
        return $res;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function permission($id_user, $id_rol, $correo, $condicion) // REALIZADO PERMISOS
    {
        $res = $this->db->query("UPDATE usuarios SET email= '$correo',id_rol = '$id_rol',condicion = '$condicion' WHERE id_user = '$id_user'");
        return $res;
    }

    public function maestros ($id_user, $correo, $nombre, $apellido, $address, $cumpleanos, $maestroasign) // REALIZADO MAESTRO
    {
        $res = $this->db->query("UPDATE usuarios SET email = '$correo', nombre = '$nombre', apellido = '$apellido', address ='$address', cumpleaños = '$cumpleanos', maestro = ($maestroasign) WHERE id_user = '$id_user'");
        return $res;
    }

    public function alumnos ($id_user, $dni, $correo, $nombre, $apellido, $address, $cumpleanos) // REALIZADO ALUMNO
    { 
        $res = $this->db->query("UPDATE usuarios SET DNI = '$dni', email = '$correo', nombre = '$nombre', apellido = '$apellido', address ='$address', cumpleaños = '$cumpleanos' WHERE id_user = '$id_user'");
        return $res;
    }

    public function clases ($id_user, $id_materia, $namemateria, $id_maestro) // REALIZADO CLASES
    {
        //$id_user1 = ($id_user === "vacio") ? null : $id_user;
        //$id_maestro1 = ($id_maestro === "vacio") ? null : $id_maestro;
        $res = $this->db->query("UPDATE materias SET name_materia = '$namemateria' WHERE id_materia = '$id_materia'");
        $res1 = $this->db->query("UPDATE usuarios SET maestro = NULL WHERE id_user = ($id_maestro)");
        $res2 = $this->db->query("UPDATE usuarios SET maestro = '$id_materia' WHERE id_user = ($id_user)"); 
        return array($res, $res1, $res2);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE MAESTROS ------------------------------------ //
    ////////////////////////////////////////////////////////////////////////////////////////////////


    public function assignment ($id_cali, $calificacion, $mensaje) // REALIZADO CALIFICACIONES Y NOTAS DE MAESTROS
    {
        $res = $this->db->query("UPDATE calificacion_observaciones SET calificacion = '$calificacion', observaciones = '$mensaje' WHERE id_cali = '$id_cali'"); // WHERE id_maestro = '4' AND id_materia = '5'
        $this->db->close();
        return $res;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function insert ($id_materia, $userID) 
    {
        $res = $this->db->query("INSERT INTO calificacion_observaciones(id_maestro, id_materia) VALUES ('$userID','$id_materia')");
        return $res;
    }

}





