<?php 
    require('main.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DocIt</title>

    <!-- da spostare in file a parte -->
    <style>
        html, body{
            margin: 0;
            padding: 0;
        }

        textarea {
            width: 100%;
        }

        .pgWrapper .container{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;

            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-grow: 1;
        }

        .pgWrapper .container .sideMenu {
            min-width: 50px;
            background: #fafafa;

        }


        .pgWrapper .container .page{
            width: auto;
            flex-grow: 1;
            padding: 0 1rem;
        }

        .pgWrapper .container .page .chapterWrapper {
            background: #f1f1f1;
            padding: .5rem 1rem;
            margin-top: 1rem;
        }

        .pgWrapper .container .page .chapterWrapper .subChapter {
            padding: 0.5rem 1rem;
            background: #dedede;
            margin: .5rem 0;
        }

        @media screen and (min-width: 64rem){
            .pgWrapper .container{

                flex-direction: row;

            }


            .pgWrapper .container .sideMenu {
                width: 300px;

            }


            .pgWrapper .container .page{
                

            }
        }

    </style>

</head>
<body id="body">
    
    <div class="pgWrapper">
        <div class="container" id="pgContainer">
            <div class="sideMenu">
                menu
                <button id="save" onclick="saveFile()">Save</button>

            </div>

            <div class="page">
                <h2>DocIt</h2>

                <hr>

                <div class="docRoot" id="docRoot">
                    <h1><input type="text" id="docTitle" placeholder="Document title..."> </h1>


                </div>

                <br>
                <button id="btnAddChapter" onclick="addChapter(event)" data-chapter-target="docRoot" title="Adds a chapter to 'data-chapter-target', normaly document root">Add Chapter</button>

            </div>
            
        </div>
    </div>

<script type="text/javascript" src="js/main.js"></script>
</body>
</html>