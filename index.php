<?php 
    //require('main.php');
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

        textarea, input {
            width: 100%;
        }

        input { 
            border: none;
        }
        input:focus {
            border-bottom: 1px solid teal;
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
            flex-grow:1;
        }


        .pgWrapper .container .page{
            width: auto;
            min-width:760px;
            flex-grow: 1;
            padding: 0 1rem;
        }

        .pgWrapper .container .notes {
            min-width: 50px;
            background: #fafafa;
            flex-grow:1;
        }

        .pgWrapper .container .page .chapterWrapper {
            padding: .5rem 1rem;
            margin-top: 1rem;
        }
        .pgWrapper .container .page .chapterWrapper:hover{
            background: #f8f8f8;
        }

        .pgWrapper .container .page .chapterWrapper .subChapter {
            padding: 0.5rem 1rem;
            margin: .5rem 0;
        }
        .pgWrapper .container .page .chapterWrapper .subChapter:hover {
            background: #f1f1f1;
        }

        h2 {
            padding-top: 10pt;
            padding-bottom: 5pt;
            margin:0;
        } 
        
        h2, h2 > input {
            background: transparent;
            color: #0d47a0;
            font-size: 20pt;
            font-family: Arial;
            font-weight: 400;
            line-height: 1.15;
            text-align: left;
            page-break-after: avoid;
        }
        h3 {
            padding-top: 18pt;
            padding-bottom: 6pt;
        }

        h3 > input {
            font-size: 16pt;
            font-weight: 400;
            background: transparent;

            color: #000;
            font-family: Arial;
            line-height: 1.15;
            page-break-after: avoid;
            text-align: left;
        }

        p > textarea {
            resize: none;
            overflow: hidden;
            min-height: 50px;
            border: none;
            background: transparent none repeat scroll 0% 0% !important;
            z-index: auto;
            position: relative;
            margin: 10px 0;
            color: #000;
            font-family: Arial;
            font-size: 14px;
            line-height: 1.5;
            letter-spacing: 1px;
            transition: none 0s ease 0s;
        }

        p > textarea:focus {
            border-left: 1px solid teal;
        }


        @media screen and (min-width: 64rem){
            .pgWrapper .container{

                flex-direction: row;

            }


            .pgWrapper .container .sideMenu {
                max-width: 250px;

            }


            .pgWrapper .container .page{
                max-width: 760px;

            }

            .pgWrapper .container .notes {
                width: 150px;

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

            <div class="notes">
            </div>
            
        </div>
    </div>

<script type="text/javascript" src="js/main.js"></script>
</body>
</html>