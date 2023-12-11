<?php

class ModelDelete
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

    public function deleteMaestro($id_user) 
    {
        $res = $this->db->query("DELETE FROM {$this->tableUser} WHERE id_user = '$id_user'");
        return $res;
    }

    public function deleteAlumno($id_user) 
    {
        $res1 = $this->db->query("DELETE FROM {$this->tableCalificaciones} WHERE id_maestro = '$id_user'");
        $res = $this->db->query("DELETE FROM {$this->tableUser} WHERE id_user = '$id_user'");
        return array($res1, $res,);
    }

    public function eliminarMateria($id_materia) 
    {
        $res = $this->db->query("DELETE FROM {$this->tableCalificaciones} WHERE id_materia = '$id_materia'");
        $res1 = $this->db->query("UPDATE {$this->tableUser} SET maestro = NULL WHERE maestro = ($id_materia)");
        $res2 = $this->db->query("DELETE FROM {$this->tableMateria} WHERE id_materia = '$id_materia'");
        return array($res, $res1, $res2);
    }

    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function deleteMateria ($id_cali) 
    {
        $res = $this->db->query("DELETE FROM {$this->tableCalificaciones} WHERE id_cali = '$id_cali'");
        return $res;
    }

}