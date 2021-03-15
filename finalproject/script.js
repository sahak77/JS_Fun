let grassCount = document.getElementById("grassCount");
let grassEaterCount = document.getElementById('grassEaterCount');
let RedEaterCount = document.getElementById('RedEaterCount');
let CreatGrassCount = document.getElementById('CreatGrassCount');
let ChessCount = document.getElementById('ChessCount');
//born%
let grassCountTokos = document.getElementById("grassCountTokos");
   let grassEaterCountTokos = document.getElementById("grassEaterCountTokos");
    let RedEaterCountTokos = document.getElementById("RedEaterCountTokos");
   let CreatGrassCountTokos = document.getElementById("CreatGrassCountTokos");
   let ChessCountTokos = document.getElementById("ChessCountTokos");

//die
let grassCountDie = document.getElementById("grassCountDie");
let grassEaterCountDie = document.getElementById('grassEaterCountDie');
let RedEaterCountDie = document.getElementById('RedEaterCountDie');
let CreatGrassCountDie = document.getElementById('CreatGrassCountDie');
let ChessCountDie = document.getElementById('ChessCountDie');

//die
let grassCountDieTokos = document.getElementById("grassCountDieTokos");
let grassEaterCountDieTokos = document.getElementById('grassEaterCountDieTokos');
let RedEaterCountDieTokos = document.getElementById('RedEaterCountDieTokos');
let CreatGrassCountDieTokos = document.getElementById('CreatGrassCountDieTokos');
let ChessCountDieTokos = document.getElementById('ChessCountDieTokos');

function setup() {
    var socket = io();
    var side = 25;
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    //born




    let weather = document.getElementById('weather');


   

    socket.on("data", drawCreatures);
    

    function drawCreatures(data) {
        
        matrix = data.matrix;
        //born

        grassCount.innerText = data.GrassCount;
        grassEaterCount.innerText = data.grassEaterCount;
        RedEaterCount.innerText = data.RedEaterCount;
        CreatGrassCount.innerText = data.CreatGrassCount;
        ChessCount.innerText = data.ChessCount;
        allBorn = data.GrassCount + data.grassEaterCount + data.RedEaterCount + data.CreatGrassCount + data.ChessCount;
        //die

        grassCountDie.innerText = data.GrassCountDie;
        grassEaterCountDie.innerText = data.grassEaterCountDie;
        RedEaterCountDie.innerText = data.RedEaterCountDie;
        CreatGrassCountDie.innerText = data.CreatGrassCountDie;
        ChessCountDie.innerText = data.ChessCountDie;
        allDie = data.GrassCountDie + data.grassEaterCountDie + data.RedEaterCountDie + data.CreatGrassCountDie + data.ChessCountDie;
        
        //born%

        grassCountTokos.innerText = (data.GrassCount / allBorn * 100).toFixed(1) +"%";
        grassEaterCountTokos.innerText = (data.grassEaterCount / allBorn * 100).toFixed(1) +"%";
        RedEaterCountTokos.innerText = (data.RedEaterCount / allBorn * 100).toFixed(1) +"%";
        CreatGrassCountTokos.innerText = (data.CreatGrassCount / allBorn * 100).toFixed(1) +"%";
        ChessCountTokos.innerText = (data.ChessCount / allBorn * 100).toFixed(1) +"%";

        //die%
        grassCountDieTokos.innerText = (data.GrassCountDie / allDie * 100).toFixed(1) +"%";
        grassEaterCountDieTokos.innerText = (data.grassEaterCountDie / allDie * 100).toFixed(1) +"%";
        RedEaterCountDieTokos.innerText = (data.RedEaterCountDie / allDie * 100).toFixed(1) +"%";
        CreatGrassCountDieTokos.innerText = (data.CreatGrassCountDie / allDie * 100).toFixed(1) +"%";
        ChessCountDieTokos.innerText = (data.ChessCountDie / allDie * 100).toFixed(1) +"%";

        

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');

        if (data.GrassCount < 700) {
            weather.innerText = "the summer";
        }
        else if (data.GrassCount > 700 && data.GrassCount < 2000) {
            weather.innerText = "winter is coming!!!";
        }
        else if (data.GrassCount > 2000) {
            weather.innerText = "winter was end.  summer is coming!!!";
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        fill("white");
                    }
                }
                else if (matrix[i][j] == 2) {
                    fill("orange");
                }
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                }
                else if (matrix[i][j] == 3) {
                    fill('red');
                }
                else if (matrix[i][j] == 4) {
                    fill('blue');
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        fill("#00B3FF");
                    }
                }
                else if (matrix[i][j] == 5) {
                    fill('yellow');
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        let r = random(255);
                        let g = random(255);
                        let b = random(255);
                        fill(r, g, b);
                    }
                }
                
                
                    rect(j * side, i * side, side, side);
    
                        
            }
        }
    }
}

function randColor() {
    var R = Math.floor(Math.random() * 256);
    var G = Math.floor(Math.random() * 256);
    var B = Math.floor(Math.random() * 256);
    var Color = "rgb(" + R + "," + G + "," + B + ")";
    document.body.style.backgroundColor = Color;
  }

