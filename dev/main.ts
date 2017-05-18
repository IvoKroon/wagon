class Game {
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    private board:Board;
    private aStar:AStar;
    private path:Array<Array<number>>;
    private car:Car;

    //loader
    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        let matrix2 = [
            [0, 0, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0]
        ];
        let matrix = this.drawMatrix(9,9);

        matrix[0][1] = 1;
        matrix[1][1] = 1;
        matrix[2][1] = 1;
        matrix[3][1] = 1;
        matrix[4][1] = 1;
        matrix[5][1] = 1;

        this.arrayToString(matrix);
        
        let blockSize:number = 40;
        let padding:number = 10;
        let startPos = new Pos(0,0);
        let endPos = new Pos(4,0);

        this.board = new Board(this,matrix,blockSize,true, true);
        //load the image
        this.aStar = new AStar(matrix, startPos, endPos);
        this.path =  this.aStar.findPath();
        this.car = new Car(this,startPos, blockSize);

        requestAnimationFrame(() => this.gameLoop());
    }

    // drawBlockOnMatrix(e:event){

    // }

    drawMatrix(width:number,height:number):Array<Array<number>>{
        var matrix = [];
        for(var i = 0; i < height; i++){
            var row = [];
            for(var j = 0; j < width; j++){
                row.push(0);
            }
            matrix.push(row);
        }
        console.log(matrix);
        return matrix;
    }

    arrayToString(matrix:Array<Array<number>>){
        var string = "[";
        for(var i = 0; i < matrix.length; i++){
            console.log(i);
            var row = "["
            row += matrix[i].join(',');
            console.log(row);
        
            if(i != matrix.length - 1){
                row += "],";
            }else{
                row += "]";
            }

            string += row;
        }
        string += "];"
        console.log(string)
    }

    

    gameLoop(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.board.draw();
        this.car.move(this.path);
        
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
   new Game();
});