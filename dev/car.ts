class Car{
    private x:number;
    private y:number;

    // for precious location for removing old loaction.
    private previousX:number;
    private previousY:number;

    private nextX:number;
    private nextY:number;

    //end point
    private endPos:Pos;
    
    private radius:number;
    private game:Game;
    private step:number = 1;
    private blockSize:number;
    private speed:number;

    private path:Array<Array<number>>
    private aStar:AStar;

    public done:Boolean = false;

    constructor(game:Game, startPos:Pos, endPos:Pos, blockSize:number){
        this.radius = 10;
        this.game = game;

        this.blockSize = blockSize;

        this.x = blockSize / 2 + blockSize * startPos.x;
        this.y = blockSize / 2 + blockSize * startPos.y;
        this.previousX = this.x;
        this.previousY = this.y;
        this.endPos = endPos;
        
        //speed
        this.speed = 1;
        // always first calc the path
        // We need to know where we need to go.
        this.calcPath();
               
    }

    //get the location.
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    //get the previous location.
    getPreviousX(){
        return this.previousX;
    }

    getPreviousY(){
        return this.previousY;
    }

    getEndPos():Pos{
        return this.endPos;
    }

    setPath(path:Array<Array<number>>){
        this.path = path;
    }


    draw(){
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y , this.radius, 0, 2 * Math.PI, false);
        this.game.context.fillStyle = 'green';
        this.game.context.fill();
        this.game.context.closePath();
    }

    private moveToPoint(){
        let xDone = false;
        let yDone = false;

        if(this.y == this.nextY){
            yDone = true;
        }else{
            if(this.y - this.nextY > 0){
                this.y -= this.speed;
            }else{
                this.y += this.speed;
            }
        }

        if(this.x == this.nextX){
            xDone = true;
        }else{
            if(this.x  - this.nextX > 0){
                this.x -= this.speed;
            }else{
                this.x += this.speed;
            }
        }

        if(yDone && xDone){
            return true;
        }
        return false;
    }
    public reset(){
        this.step = 1;
    }

    private calcPath(){
        //cal a new path
        console.log("CALCULATE NEW PATH");
        this.aStar = new AStar(
                            this.game.matrix, 
                            Util.getXYPostion(this.x,this.y,this.blockSize),
                            this.getEndPos());
        this.path = this.aStar.findPath();

        //We are there.
        if(this.path.length <= 1){
            // console.log("We are on the location!");
            this.done = true;
        }else{
            //get the position
            let pos:Pos = new Pos(this.path[1][0], this.path[1][1]);
            //save the next direction
            this.nextX = pos.x * this.blockSize + this.blockSize / 2;
            this.nextY = pos.y * this.blockSize + this.blockSize / 2;
            
            this.game.drawObstacle(Util.getXYPostion(this.previousX, this.previousY, this.blockSize));
            this.game.drawObstacle(Util.getXYPostion(this.nextX,this.nextY, this.blockSize));
        }
        
    }

    // private drawObstaclForSelf(){
        
    // }

    public move(){
        
        this.previousX = this.x;
        this.previousY = this.y;

        
        if(this.moveToPoint()){
            // We are there
            // Now we need to look if there is somebody on the path.
            
            if(!this.done){
                console.log(this.x + " - " + this.endPos.x);
                this.calcPath();
            }
        }

        this.draw();
        

    }
}