class Matrix {
    constructor(width, height, mine) {
        this.size = {
            width,
            height,
            blockCount: width * height
        };
        this.mineCount = mine;
        this.minesPos = [];
        this.gameArea = [];
    }

    generateAroundMinesPos(posY, posX) {
      return [
          { y: posY - 1, x: posX - 1 },
          { y: posY - 1, x: posX },
          { y: posY - 1, x: posX + 1 },

          { y: posY, x: posX - 1 },
          { y: posY, x: posX + 1 },

          { y: posY + 1, x: posX - 1 },
          { y: posY + 1, x: posX },
          { y: posY + 1, x: posX + 1 },
        ]
    }

    minesAround (posY, posX) {
       const aroundMinesPos = this.generateAroundMinesPos(posY, posX);
       aroundMinesPos.forEach((pos) => {
           if (pos.y >= 0 && pos.x >= 0 && pos.y < this.size.height && pos.x < this.size.width) {
               if (this.gameArea[pos.y][pos.x].val !== "*") this.gameArea[pos.y][pos.x].val++;
           }
       })
    }

    generateMatrix() {
        for (let i = 0; i < this.size.height; i++) {
            this.gameArea[i] = [];
            for (let j = 0; j < this.size.width; j++) {
                this.gameArea[i][j] = { val: 0, id: '_' + Math.random().toString(36).substr(2, 9), open: false};
            }
        }
    }

    generateMines() {
        while(this.minesPos.length !== this.mineCount) {
            let minePos = Math.floor(Math.random() * this.size.blockCount);
            if (this.minesPos.filter((i) => i.index === minePos).length) continue;
            this.minesPos.push({ index: minePos, posX: minePos % this.size.width, posY: Math.floor(minePos / this.size.width ) });
        }
    }

    fillMinesInMatrix () {
        this.minesPos.forEach((el) => {
            this.gameArea[el.posY][el.posX].val = '*';
            this.minesAround(el.posY, el.posX);
        })
    }

    generateNewGame() {
        this.generateMatrix();
        this.generateMines();
        this.fillMinesInMatrix();

        return this.gameArea;
    }
}
