
<?php 
include_once('util.php');

/* app code */
function getContent(){
    $doc = 'docs/doc.json';
    //check file
    if(file_exists($doc)){
        // $docFile = fopen($doc, 'r+');
        // leggo quello che c'è sul file
        $docContent = file_get_contents($doc); 

        header('Content-Type: application/json');
        echo $docContent;
    }
}

// @TODO implement this functionality
function saveContent($data){
    $doc = 'docs/doc1.json';
    //check file
    if(file_exists($doc)){
        //logOnConsole('fiel exists');
        $docFile = fopen($doc, 'r+');
    }

}

function saveElementData($record){
    $doc = 'docs/doc.json';
    //check file
    if(file_exists($doc)){
        $workArray = json_decode(file_get_contents($doc),true);

        if(existsRecord($record['id'], $workArray['elements'])){
            foreach ($workArray['elements'] as $key => &$value) {
                if($value['id'] == $record['id'] && $value['type'] == $record['type'] ){
                    $value['cnt'] = $record['cnt'];
                    //for future use (change parent)
                    $value['parentId'] = $record['parentId'];
                    $value['pos'] = $record['pos'];
                }
            }
        }else{
            $workArray['elements'][] = $record;
        }

        file_put_contents($doc, json_encode($workArray));
    }

}

function existsRecord($id, $workArray){

    foreach ($workArray as $key => $value) {
        if($value['id'] == $id){
            $exists = true;        
            return true;
        }
    }
    return false;
}

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET': 
        $the_request = &$_GET; 
        getContent();
        break;
    case 'POST': 
        //$the_request = &$_POST; 
        $data = json_decode(file_get_contents('php://input'), true);
        //var_dump($data);
        saveElementData($data);
        
        break;

    default:
        break;
}




?>