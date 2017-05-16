class Game {
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    private board:Board;
    private aStar:AStar;
    private path:Array<Array<number>>;

    //loader
    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        let matrix = [
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0]
        ];
        this.board = new Board(this,matrix,40);
        this.aStar = new AStar(matrix);
        this.path =  this.aStar.findPath();
        // console.log(this.aStar.findPath());


        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop(){
        // console.log("TEST");
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.board.drawBoard();
        this.board.moveCar(this.path);
        
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
   new Game();
});