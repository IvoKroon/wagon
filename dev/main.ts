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
        let matrix = this.drawMatrix(10,10);

        matrix[0][1] = 1;
        matrix[1][1] = 1;
        matrix[2][1] = 1;
        matrix[3][1] = 1;
        matrix[4][1] = 1;
        matrix[5][1] = 1;
        matrix[6][1] = 1;
        matrix[7][1] = 1;
        matrix[8][1] = 1;


        matrix[7][3] = 1;
        matrix[8][4] = 1;
        matrix[8][5] = 1;
        matrix[8][3] = 1;
        matrix[9][3] = 1;
        matrix[9][4] = 1;
        matrix[9][5] = 1;

        matrix[2][7] = 1;
        matrix[3][7] = 1;
        matrix[4][7] = 1;
        matrix[5][7] = 1;
        matrix[6][7] = 1;
        matrix[7][7] = 1;
        matrix[8][7] = 1;
        matrix[9][7] = 1;

        matrix[0][2] = 1;
        matrix[0][3] = 1;
        matrix[0][4] = 1;
        matrix[0][5] = 1;
        matrix[0][6] = 1;
        matrix[0][7] = 1;
        matrix[0][8] = 1;
        matrix[0][9] = 1;

        matrix[1][5] = 1;
        matrix[2][5] = 1;
        matrix[3][5] = 1;
        matrix[4][5] = 1;

        matrix[1][4] = 1;
        matrix[2][4] = 1;
        matrix[3][4] = 1;
        matrix[4][4] = 1;

        matrix[1][3] = 1;
        matrix[2][3] = 1;
        matrix[3][3] = 1;
        matrix[4][3] = 1;

        matrix[1][9] = 1;
        matrix[2][9] = 1;
        matrix[3][9] = 1;
        matrix[4][9] = 1;
        matrix[5][9] = 1;
        matrix[6][9] = 1;
        matrix[7][9] = 1;
        matrix[8][9] = 1;
        matrix[9][9] = 1;



        this.arrayToString(matrix);
        
        let blockSize:number = 40;
        let padding:number = 10;
        let startPos = new Pos(0,0);
        let endPos = new Pos(8,8);

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