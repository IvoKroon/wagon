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
        let matrix = [
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0]
        ];
        let blockSize:number = 40;
        let padding:number = 10;
        let startPos = new Pos(1,1);

        this.board = new Board(this,matrix,blockSize);
        this.aStar = new AStar(matrix, startPos);
        this.path =  this.aStar.findPath();
        this.car = new Car(this,startPos, blockSize);

        requestAnimationFrame(() => this.gameLoop());
    }

    

    gameLoop(){
        // console.log("TEST");
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.board.drawBoard();
        this.car.move(this.path);
        // this.board.moveCar(this.path);
        
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
   new Game();
});