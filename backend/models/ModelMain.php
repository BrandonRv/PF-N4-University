<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/backend/models/ModeRMDU.php";

class ModelMain extends ModeRMDU
{
    protected $table = "usuarios";
    protected $tableInfo = "usuarios u";
    protected $table1 = "materias";
    protected $tableCalificaciones = "calificacion_observaciones c";
    protected $tableMateria = 'materias m';

}
