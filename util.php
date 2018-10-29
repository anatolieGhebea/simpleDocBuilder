<?php

/* utility function */
function logOnConsole( $msg) {

    if(is_array($msg))
        $msg = implode('|', $msg);

    echo '<script type="text/javascript">(function () {  console.log("'.$msg.'"); })(); </script>';
}