<?php
class DB
{
    public static function query($query)
    {
        try {
            $config = include($_SERVER["DOCUMENT_ROOT"] . "/backend/config/database.php");
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            $mysqli = new mysqli(
                $config["host"], 
                $config["username"], 
                $config["password"], 
                $config["dbname"],
                $config["port"]
            );
            $mysqli->set_charset("utf8");
            $res = $mysqli->query($query);
            $data = $res->fetch_all(MYSQLI_ASSOC);
            $mysqli->close();
            return $data;
        } catch (mysqli_sql_exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
