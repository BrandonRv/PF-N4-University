<?php

class ModeRMDU
{

    private $db;
    protected $table;
    protected $tableInfo;
    protected $tableCalificaciones;
    protected $tableMateria;

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

    public function profileInfo($userID)
    {

        $idEntero = intval($userID);

        $res = $this->db->query("SELECT
        DNI,
        nombre,
        apellido,
        email,
        address,
        cumpleaños,
        condicion
        FROM {$this->table} WHERE id_user = {$idEntero}");

        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function permission()
    {
        $res = $this->db->query("SELECT 
            u.id_user,
            u.email, 
            u.id_rol,
            r.nombre_rol AS nombre_del_rol,
            u.condicion 
        FROM {$this->tableInfo} 
        JOIN rol r ON u.id_rol = r.id_rol");
        $data = $res->fetch_all(MYSQLI_ASSOC);

        $resrol = $this->db->query("SELECT id_rol FROM rol");
        $datarol = $resrol->fetch_all(MYSQLI_ASSOC);
    
        return array($data, $datarol);
    }

    public function teacherAll()
    {
        $res = $this->db->query("SELECT 
            u.id_user,
            u.nombre, 
            u.apellido, 
            u.email, 
            u.address, 
            u.cumpleaños, 
            m.name_materia,
            m.id_materia
        FROM {$this->tableInfo} 
        LEFT JOIN materias m ON u.maestro = m.id_materia 
        WHERE u.id_rol = 2");

        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function alumnosAll()
    {
        $res = $this->db->query("SELECT
        id_user,
        DNI,
        nombre,
        apellido,
        email,
        address,
        cumpleaños
        FROM {$this->table} WHERE id_rol = 3");

        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function subjectsAll() //---------------------------------------------- FALTA REALIZAR ------------------------------------------//
    {
        $res1 = $this->db->query("SELECT id_user, nombre, apellido FROM usuarios WHERE maestro IS NULL AND id_rol = 2");
        $res = $this->db->query("CALL obtenerInformacionMaterias()");
       

        $data = $res->fetch_all(MYSQLI_ASSOC);
        $data1 = $res1->fetch_all(MYSQLI_ASSOC);
        return array($data, $data1);
    }


    public function studentTeacher($userID)
    {
        $idEntero = intval($userID);
        $res = $this->db->query("CALL ObtenerInfoAlumnosPorMaestro({$idEntero})");
        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function calificacionesAll($userID)
    {
        $idEntero = intval($userID);
        $res = $this->db->query("SELECT
        c.id_materia,
        c.calificacion, 
        c.observaciones,
        c.id_cali, 
        m.name_materia
        FROM {$this->tableCalificaciones} 
        JOIN usuarios u ON c.id_maestro = u.id_user 
        JOIN materias m ON c.id_materia = m.id_materia
        WHERE u.id_user = {$idEntero}");

        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    public function materiaNOTinsert($userID)
    {
        $idEntero = intval($userID);
        $res = $this->db->query("CALL consultar_materias_no_tomadas({$idEntero})");
        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}
