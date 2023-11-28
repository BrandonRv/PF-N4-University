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

    function verification($table)
    {

     $tableUser1 = "usuarios";
     $tableRol1 = "rol";
     $tableMateria1 = "materias";
     $tableCalificaciones1 = "calificacion_observaciones";


        if ($tableUser1 === $table) {

            $data = $this->UpdateUser('$data_del_usuario');
            echo json_encode([
                'error' => $data
            ]);

        } else if ($tableRol1 === $table) {

            $data = $this->UpdateRol('$data_del_usuario');
            echo json_encode([
                'error' => $data
            ]);

        } else if ($tableMateria1 === $table) {

            $data = $this->UpdateMaterias('$data_del_usuario');
            echo json_encode([
                'error' => $data
            ]);

        } else if ($tableCalificaciones1 === $table) {

            $data = $this->UpdateCalificaciones('$data_del_usuario');
            echo json_encode([
                'error' => $data
            ]);
        }
    }


    function UpdateUser () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableUser} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    function UpdateRol () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableRol} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    function UpdateMaterias () {

        // AQUI ADENTRO VAN LOS QUERY EN CASVADA EN TAL CASO
        $query = "update {$this->tableMateria} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }

    function UpdateCalificaciones () {

        // AQUI ADENTRO VAN LOS QUERY EN CASCADA EN TAL CASO
        $query = "update {$this->tableCalificaciones} set " . 'columna_a_actualizar Y VALOR' . "where id = {'AQUI PUEDE IR EL ID DEL DATO POR ACTUALIZAR'}";
        $this->db->query($query);

    }
}



