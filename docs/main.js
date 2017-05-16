var AStar = (function () {
    function AStar(matrix) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 2;
        this.endY = 2;
        this.matrix = matrix;
        this.grid = new PF.Grid(this.matrix);
        this.finder = new PF.AStarFinder();
    }
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
        this.draw();
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
    function Board(game, matrix, blockSize) {
        this.game = game;
        this.matrix = matrix;
        this.blockSize = blockSize;
        var rows = matrix.length;
        var column = matrix[0].length;
        this.width = column * this.blockSize;
        this.height = rows * this.blockSize;
        this.padding = 10;
        this.drawBoard();
        this.drawCar();
    }
    Board.prototype.drawBoard = function () {
        this.drawOnBoard();
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
    Board.prototype.drawCar = function () {
        this.car = new Car(this.game, this.blockSize / 2 + this.padding, this.blockSize / 2 + this.padding);
        this.car.draw();
    };
    Board.prototype.moveCar = function (path) {
        this.car.move(path, this.blockSize);
    };
    Board.prototype.drawOnBoard = function () {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 1) {
                    new Block(this.game, this.blockSize, j * this.blockSize + this.padding, i * 40 + this.padding).draw();
                }
            }
        }
    };
    return Board;
}());
var Car = (function () {
    function Car(game, x, y) {
        this.step = 1;
        this.radius = 10;
        this.game = game;
        this.x = x;
        this.y = y;
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
            console.log("X = " + this.x + " - " + endX);
            if (this.x - endX > 0) {
                this.x--;
            }
            else {
                this.x++;
            }
        }
        if (this.y == endY) {
            console.log("Y = " + this.y + " - " + endY);
            yDone = true;
        }
        else {
            console.log("Y = " + this.y + " - " + endY);
            if (this.y - endY > 0) {
                this.y--;
            }
            else {
                this.y++;
            }
        }
        if (yDone && xDone) {
            this.draw();
            return true;
        }
        this.draw();
        return false;
    };
    Car.prototype.move = function (points, blockSize) {
        if (this.step == points.length) {
            this.draw();
            console.log("END");
        }
        else {
            var x = (points[this.step][0] + 1) * blockSize - 10;
            console.log(points[this.step]);
            var y = (points[this.step][1] + 1) * blockSize - 10;
            ;
            if (this.moveToPoint(x, y)) {
                this.step++;
            }
        }
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        var matrix = [
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0]
        ];
        this.board = new Board(this, matrix, 40);
        this.aStar = new AStar(matrix);
        this.path = this.aStar.findPath();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.board.drawBoard();
        this.board.moveCar(this.path);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map