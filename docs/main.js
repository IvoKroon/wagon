var AStar = (function () {
    function AStar(matrix, start, end) {
        this.startX = start.x;
        this.startY = start.y;
        this.endX = end.x;
        this.endY = end.y;
        this.matrix = matrix;
        this.grid = new PF.Grid(this.matrix);
        this.finder = new PF.AStarFinder();
    }
    AStar.prototype.goTo = function () {
    };
    AStar.prototype.findPath = function () {
        var path = this.finder.findPath(this.startX, this.startY, this.endX, this.endY, this.grid);
        console.log(path);
        return path;
    };
    return AStar;
}());
var Block = (function () {
    function Block(game, size, x, y) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    Block.prototype.draw = function () {
        this.game.context.beginPath();
        this.game.context.rect(this.x, this.y, this.size, this.size);
        this.game.context.fillStyle = 'red';
        this.game.context.fill();
        this.game.context.closePath();
    };
    return Block;
}());
var Board = (function () {
    function Board(game, matrix, blockSize, showGrid, drawBlocks) {
        this.game = game;
        this.matrix = matrix;
        this.blockSize = blockSize;
        var rows = matrix.length;
        var column = matrix[0].length;
        this.width = column * this.blockSize;
        this.height = rows * this.blockSize;
        this.padding = 10;
        this.showGrid = showGrid;
        this.drawBlocks = drawBlocks;
    }
    Board.prototype.draw = function () {
        this.drawObstacle();
        if (this.showGrid) {
            this.drawBoard();
        }
    };
    Board.prototype.drawBoard = function () {
        this.game.context.beginPath();
        for (var x = 0; x <= this.width; x += this.blockSize) {
            this.game.context.moveTo(0.5 + x + this.padding, this.padding);
            this.game.context.lineTo(0.5 + x + this.padding, this.height + this.padding);
        }
        for (var y = 0; y <= this.height; y += this.blockSize) {
            this.game.context.moveTo(this.padding, 0.5 + y + this.padding);
            this.game.context.lineTo(this.width + this.padding, 0.5 + y + this.padding);
        }
        this.game.context.strokeStyle = "black";
        this.game.context.stroke();
        this.game.context.closePath();
    };
    Board.prototype.drawObstacle = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 1) {
                    var block = new Block(this.game, this.blockSize, j * this.blockSize + this.padding, i * 40 + this.padding);
                    if (this.drawBlocks) {
                        block.draw();
                    }
                }
            }
        }
    };
    return Board;
}());
var Car = (function () {
    function Car(game, startPos, blockSize) {
        this.step = 1;
        this.radius = 10;
        this.game = game;
        this.blockSize = blockSize;
        this.x = blockSize / 2 + 10 + blockSize * startPos.x;
        this.y = blockSize / 2 + 10 + blockSize * startPos.y;
    }
    Car.prototype.draw = function () {
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.game.context.fillStyle = 'green';
        this.game.context.fill();
        this.game.context.closePath();
    };
    Car.prototype.moveToPoint = function (endX, endY) {
        var xDone = false;
        var yDone = false;
        if (this.x == endX) {
            xDone = true;
        }
        else {
            if (this.x - endX > 0) {
                this.x--;
            }
            else {
                this.x++;
            }
        }
        if (this.y == endY) {
            yDone = true;
        }
        else {
            if (this.y - endY > 0) {
                this.y--;
            }
            else {
                this.y++;
            }
        }
        if (yDone && xDone) {
            return true;
        }
        return false;
    };
    Car.prototype.move = function (points) {
        if (this.step != points.length) {
            var x = (points[this.step][0] + 1) * this.blockSize - 10;
            var y = (points[this.step][1] + 1) * this.blockSize - 10;
            if (this.moveToPoint(x, y)) {
                this.step++;
            }
        }
        this.draw();
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        var matrix2 = [
            [0, 0, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0]
        ];
        var matrix = this.drawMatrix(9, 9);
        matrix[0][1] = 1;
        matrix[1][1] = 1;
        matrix[2][1] = 1;
        matrix[3][1] = 1;
        matrix[4][1] = 1;
        matrix[5][1] = 1;
        this.arrayToString(matrix);
        var blockSize = 40;
        var padding = 10;
        var startPos = new Pos(0, 0);
        var endPos = new Pos(4, 0);
        this.board = new Board(this, matrix, blockSize, true, true);
        this.aStar = new AStar(matrix, startPos, endPos);
        this.path = this.aStar.findPath();
        this.car = new Car(this, startPos, blockSize);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.drawMatrix = function (width, height) {
        var matrix = [];
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(0);
            }
            matrix.push(row);
        }
        console.log(matrix);
        return matrix;
    };
    Game.prototype.arrayToString = function (matrix) {
        var string = "[";
        for (var i = 0; i < matrix.length; i++) {
            console.log(i);
            var row = "[";
            row += matrix[i].join(',');
            console.log(row);
            if (i != matrix.length - 1) {
                row += "],";
            }
            else {
                row += "]";
            }
            string += row;
        }
        string += "];";
        console.log(string);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.draw();
        this.car.move(this.path);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Pos = (function () {
    function Pos(x, y) {
        this.x = x;
        this.y = y;
    }
    return Pos;
}());
//# sourceMappingURL=main.js.map