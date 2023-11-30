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


    public function profile () 
    {
        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableUser} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------- PERMISOS DE ADMINISTRADOR ----------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function permission($id_user, $id_rol, $correo, $condicion)
    {
        $id = intval($id_user);
        $rol = intval($id_rol);
        $permiso = intval($condicion);

        $res = $this->db->query("UPDATE usuarios SET email= '$correo',id_rol = '$rol',condicion = '$permiso' WHERE id_user = '$id'");
        return $res;
    }

    public function maestros () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableRol} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    public function alumnos () {

        // AQUI ADENTRO VAN LOS QUERY EN CASVADA EN TAL CASO
        $query = "update {$this->tableMateria} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    public function clases () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableCalificaciones} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE MAESTROS ------------------------------------ //
    ////////////////////////////////////////////////////////////////////////////////////////////////


    public function assignment () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableCalificaciones} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // -------------------------------- PERMISOS DE ALUMNOS ------------------------------------- //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    public function insert () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableCalificaciones} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

}





