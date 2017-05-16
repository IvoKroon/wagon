
declare var PF:any; // Magic
class AStar{
    private startX:number;
    private startY:number;

    private endX:number;
    private endY:number;

    private matrix:Array<Array<number>>;
    private grid:any;
    private finder:any;

    private path:any;

    constructor(matrix:Array<Array<number>>){
        this.startX = 0;
        this.startY = 0;
        this.endX = 2;
        this.endY = 2
        //setup
        this.matrix = matrix;

        this.grid = new PF.Grid(this.matrix);

        this.finder = new PF.AStarFinder();
        // this.findPath();
    }

    findPath(){
        var path = this.finder.findPath(this.startX, this.startY, this.endX, this.endY, this.grid);
        console.log(path);
        return path;
    }
}