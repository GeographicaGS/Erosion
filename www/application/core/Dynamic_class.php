<?php

/*
 * Class that allow to create properties on runtime
 */

class Dynamic_class
{
    public function __set($key, $value)
    {
        $this->$key = $value;
    }
    
}

?>
