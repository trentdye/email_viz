function Circle(x, y, r, history) {

    this.history = history;
    this.body = Bodies.circle(x, y, r, {friction:0.5,restitution:0.5});
    this.r = r;
    this.destR = r;
    this.prevScale = 1;
    this.prevMonth = -1;
    this.removed = false;
    this.inactive = false;
    this.startMonth = history.startMonth;
    this.originalLocation = Matter.Vector.create(x,y);
    World.add(world, this.body);
    this.body.label = this.history.name;
    this.body.label2 = this.history.data[curMonth];
    this.col = floor(random(0,255));


    this.removeFromWorld = function () {
        if(!this.removed)
        {
            World.remove(world, this.body);
            Matter.Body.setPosition(this.body, this.originalLocation);
        }
        this.removed = true;
    }
    
    this.addToWorld = function () {
        if(this.removed)
        {
            World.add(world, this.body);
            
        }
        this.removed = false;
        
    }

    this.show = function () {

        var pos = this.body.position;
        var angle = this.body.angle;
        //push();
        //translate(pos.x, pos.y);

        if(curMonth != this.prevMonth){

            this.inactive = this.history.data[curMonth] == 0;
            this.body.label2 = this.history.data[curMonth];
            if(curMonth < this.startMonth){
                this.removeFromWorld();
                //console.log('removed');
            }
            else{
                this.addToWorld();
                //grow to appropriate size
                this.grow(this.findSize(curMonth));
                //Matter.Body.setMass(this.body, .3);
            }
            this.prevMonth = curMonth;
            
        }
        if(!this.removed){
           if(this.inactive){
               noFill();
               strokeWeight(1);
               stroke(this.col, 200, 150);
               //console.log(this);
           }
            else{
                noStroke();
                //stroke(this.col, 200, 103);
                fill(this.col, 200, 150);}
            this.r = this.r + (this.destR-this.r)*0.1;
            ellipse(pos.x, pos.y, this.r * 2-2); 
        }
        //pop();
    }

    //Wields the matter.body.scale function to size things accordingly
    this.grow = function (scale) {
        scale = sqrt(scale);
        Matter.Body.scale(this.body, scale/this.prevScale, scale/this.prevScale);
        this.prevScale = scale;
        //console.log(this.body.circleRadius);
        this.destR = this.body.circleRadius;
        //console.log('grown');
        //Matter.Body.setMass(this.body, .2);
    }
    
    //A pretty shitty algorithm for mapping list size to circle size
    this.findSize = function (month) {
        var val = history.data[month];
        var size;
        if(val==0){
            return 3;
        }
        if(val<100){
            size = map(val, 0,50,5,20);
        }
        else {
            size = map(val, 101,450,20,70);
        }
        
        //console.log(size);
        return size;
        
    }

}