grassArr = [];
grassEaterArr = [];
redArr = [];
creatArr = [];
chessArr = [];
matrix = [];
// born
Grasshashiv = 0;
GrassEaterhashiv = 0;
RedEaterhashiv = 0;
CreatGrasshashiv = 0;
Chesshashiv = 0;
//born%

//die
GrasshashivDie = 0;
GrassEaterhashivDie = 0;
RedEaterhashivDie = 0;
CreatGrasshashivDie = 0;
ChesshashivDie = 0;
//die%




let random = require('./modules/random');
function matrixGenerator(matrixSize, grass, grassEater, eatred, createater, chessrr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < eatred; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < createater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < chessrr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(40, 15, 40, 50,40,4);

//! Requiring modules  --  START

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Eatred = require("./modules/Eatred.js");
var Creatgrass = require("./modules/Creatgrass.js");
var Chess = require("./modules/Chess.js");

//! Requiring modules  --  END



//! SERVER STUFF  --  START

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                GrassEaterhashiv++;
            } 
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                Grasshashiv++;
            }
            else if (matrix[y][x] == 3) {
                var eatred = new Eatred(x, y);
                redArr.push(eatred);
                RedEaterhashiv++;
            }
            else if (matrix[y][x] == 4){
                var aq = new Creatgrass(x,y);
                creatArr.push(aq);
                CreatGrasshashiv++;
            }
            else if (matrix[y][x] == 5){
                var ew = new Chess(x,y);
                chessArr.push(ew);
                Chesshashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();  
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in redArr) {
        redArr[i].eat();
    }
    for (var i in creatArr) {
        creatArr[i].eat();
    }
    for (var i in chessArr) {
        chessArr[i].eat();
    }

    let sendData = {
        matrix: matrix,
        
        // born
        GrassCount: Grasshashiv,
        grassEaterCount: GrassEaterhashiv,
        RedEaterCount: RedEaterhashiv,
        CreatGrassCount: CreatGrasshashiv,
        ChessCount: Chesshashiv,
        //die
        GrassCountDie: GrasshashivDie,
        grassEaterCountDie: GrassEaterhashivDie,
        RedEaterCountDie: RedEaterhashivDie,
        CreatGrassCountDie: CreatGrasshashivDie,
        ChessCountDie: ChesshashivDie,
    }

    io.sockets.emit("data", sendData); 
}
setInterval(game, 270)
