class Car{
    private x:number;
    private y:number;
    private radius:number;
    private game:Game;
    private step:number = 1;

    constructor(game:Game,x:number, y:number){
        this.radius = 10;
        this.game = game;

        this.x = x;
        this.y = y;
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
            // console.log("MOVING X");
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
            this.draw();
            return true;
        }
        this.draw();
        return false;
    }
    public move(points:Array<Array<number>>, blockSize:number){
        // console.log("MOVING");
        if(this.step == points.length){
            //end but keep drawing.
            this.draw();
            console.log("END");
        }else{
            //if steps is not more then the points
            //move to point
            let x = (points[this.step][0] + 1) * blockSize - 10;
            console.log(points[this.step])
            let y = (points[this.step][1] + 1) * blockSize - 10;
            ;
            if(this.moveToPoint(x,y)){
                //we are there
                this.step++;
            }
        }
        // for(let i = 0; i < points.length; i++){
        //     // for(let j = 0; j < points[i].length; j++){

        //     // }
        // }
        //get array
        

    }
}