class Car{
    private x:number;
    private y:number;
    private radius:number;
    private game:Game;
    private step:number = 1;
    private blockSize:number;

    constructor(game:Game, startPos:Pos, blockSize:number){
        this.radius = 10;
        this.game = game;

        this.blockSize = blockSize;

        this.x = blockSize / 2 + 10 + blockSize * startPos.x;
        this.y = blockSize / 2 + 10 + blockSize * startPos.y; 
               
    }

    draw(){
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y , this.radius, 0, 2 * Math.PI, false);
        this.game.context.fillStyle = 'green';
        this.game.context.fill();
        this.game.context.closePath();
    }

    private moveToPoint(endX:number, endY:number){
        let xDone = false;
        let yDone = false;

        if(this.x == endX){
            xDone = true;
        }else{
            console.log("X = " + this.x + " - " + endX);
            if(this.x - endX > 0){
                this.x--;
            }else{
                this.x++;
            }
        }

        if(this.y == endY){
            console.log("Y = " + this.y + " - " + endY);
            yDone = true;
        }else{
            console.log("Y = " + this.y + " - " + endY);
            if(this.y - endY > 0){
                this.y--;
            }else{
                this.y++;
            }
        }

        if(yDone && xDone){
            // this.draw();
            return true;
        }
        // this.draw();
        return false;
    }

    public move(points:Array<Array<number>>){
        //check if the length is the same 
        if(this.step != points.length){
            let x = (points[this.step][0] + 1) * this.blockSize - 10;
            let y = (points[this.step][1] + 1) * this.blockSize - 10;

            if(this.moveToPoint(x,y)){
                this.step++;
            }
        }
        //always keep drawing
        this.draw();
        

    }
}