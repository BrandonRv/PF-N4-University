<?php
class ModelLogin
{
    private $db;
    protected $table  = "usuarios";

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

    public function where($column, $operator, $correo)
    {
        $res = $this->db->query("select * from {$this->table} where $column $operator '$correo'");
        $data = $res->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}
