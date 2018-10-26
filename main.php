<?php 
/* utility function */
function logOnConsole( $msg) {

    if(is_array($msg))
        $msg = implode('|', $msg);

    echo '<script type="text/javascript">(function () {  console.log("'.$msg.'"); })(); </script>';
}

/* app code */


function getContent(){
    $doc = 'docs/doc.json';
    //check file
    if(file_exists($doc)){
        logOnConsole('fiel exists');

        // $docFile = fopen($doc, 'r+');
        // leggo quello che c'è sul file
        $docContent = file_get_contents($doc);    
    }
}

function saveContent($data){
    $doc = 'docs/doc1.json';
    //check file
    if(file_exists($doc)){
        logOnConsole('fiel exists');

        $docFile = fopen($doc, 'r+');

        fwrite($docFile, $data);

        fclose($docFile);

    }

}

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET': 
        $the_request = &$_GET; 
        getContent();
        break;
    case 'POST': 
        $the_request = &$_POST; 
        var_dump($the_request);
        saveContent($the_request);
        
        break;

    default:
        break;
}




?>