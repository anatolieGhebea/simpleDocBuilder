<?php 
// codice relativo al server


?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document single page builder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />
    
    
</head>
<body class="main">
    <h1>Simple single page document builder</h1>

    <div id="document-preview" class="document-content-preview">
        <div id="main-document" class="main-document">
            <div class="page-cols">
                <div class="col-sx sidebar">
                    side bar
                </div>
                <div class="col-dx pg-content" id="pg-content">
                    <!-- chapter template -->
                    <div class="chapter">
                        <h1>Introduzione</h1>

                        <div class="section">
                            <h2># parte prima</h2>
                            <div class="paragraph">
                                qui ci va l'html generato da rich text area
                            </div>
                        </div>
                        <div class="section">
                            <h2># parte seconda</h2>
                            <div class="paragraph">
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- end chapter template  -->

                </div>
            </div>
        </div>  
    </div>

    <div class="pg-toolbar">
        <div class="wrapper">
            <p> tools: </p>

            <button>Add Chapter</button>
            <button>Add Section</button>
            <button>Add Paragraph</button>
            
        </div>
    </div>

<div class="inputPopup" id="inputPopup">
    <div>
        <label for="temp-input">Inserisci il titolo o il nome</label>
        <input type="text" id="temp-input">
        <div class="btn-act">
            <button id="add-with-input">add content</button>
            <button id="abort-action">abort action</button>
        </div>
    </div>
</div>

<div id="csContextMenu" class="cs-contextMenu" style="display:none;position:absolute;">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
        <li><a href="#">Item 3</a></li>
    </ul>
</div>


<script src="js/main.js"></script>

<script>

</script>

</body>
</html>