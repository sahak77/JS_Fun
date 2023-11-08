let WIDTH = 15;
let HEIGHT = 15;
let MINE = 30;

let htmlVal = '';
let openCount = 0;

let matrix, newGame;

const selectTable = document.querySelector('.game_table')

const resetValues = () => {
    htmlVal = '';
    openCount = 0;
};

const setValues = (width, height, mine) => {
    WIDTH = width;
    HEIGHT = height;
    MINE = mine;
};

const OK = (text) => {
    alert(text);
    startNewGame(WIDTH, HEIGHT, MINE);
};

const customValue = () => {
    const widthVal = Number(document.getElementById('widthVal').value);
    const heightVal = Number(document.getElementById('heightVal').value);
    const mineVal = Number(document.getElementById('mineVal').value);

    if (!widthVal || !heightVal || !mineVal) alert('invalid values');
    else startNewGame(widthVal, heightVal, mineVal);
};

const checkAround = (posY, posX) => {
    let posArr = matrix.generateAroundMinesPos(Number(posY), Number(posX));
    posArr.forEach((pos) => {
        if (pos.y >= 0 && pos.x >= 0 && pos.y < HEIGHT && pos.x < WIDTH && newGame[pos.y][pos.x].val !== "*" ) {
            if (newGame[pos.y][pos.x].open) return;
            newGame[pos.y][pos.x].open = true;
            openCount++;
            if (newGame[pos.y][pos.x].val === 0) {
                document.getElementById(newGame[pos.y][pos.x].id).style.backgroundColor = 'gray';
                checkAround(pos.y, pos.x)
            }
            else {
                document.getElementById(newGame[pos.y][pos.x].id).innerText = newGame[pos.y][pos.x].val;
                document.getElementById(newGame[pos.y][pos.x].id).style.backgroundColor = '#bbbbbb';

            }
        }
    });
};

const handleLeftClick = (element, val, posY, posX) => {
    if (newGame[posY][posX].open) return;

    newGame[posY][posX].open = true;
    openCount++;
    if(val === '0') {
        element.style.backgroundColor = 'gray';
        checkAround(posY, posX);
    } else {
        element.innerText = val;
        element.style.backgroundColor = "#bbbbbb";
    }

    if (val === '*') OK('you lose');
    else if (WIDTH * HEIGHT - openCount === MINE) OK('you win');
};

const handleRightClick = (element, posY, posX) => {
    if (newGame[posY][posX].open) return;
    element.style.backgroundColor = element.style.backgroundColor ? '' : 'black';
};

const drawGame = () => {
    for (let i = 0, row = ''; i < newGame.length; i++) {
        for (let j = 0; j < newGame[i].length; j++) {
            row += `<td id='${newGame[i][j].id}' oncontextmenu="handleRightClick(this, '${i}', '${j}')"  onclick="handleLeftClick(this, '${newGame[i][j].val}', '${i}', '${j}')" />`;
        }
        htmlVal += `<tr>${row}</tr>`;
        row = '';
    }
    selectTable.innerHTML = htmlVal;
};

const startNewGame = (width = WIDTH, height = HEIGHT, mine = MINE) => {
    resetValues();
    setValues(width, height, mine);
    matrix = new Matrix(WIDTH, HEIGHT, MINE);
    newGame = matrix.generateNewGame();
    drawGame();
};

startNewGame();