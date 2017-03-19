var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];

var ground;

var curMonth = 0;
var curMonthString = "";
var dataSet;
var numClubs;
var slider;
var mouse;
var canvas;
var mouseCollider;
var maxMonth = 157;

var edgeBuffer = 10;

var fontBold, fontRegular;

function preload()
{
    dataSet = loadJSON('clean_data_min.json');
    fontRegular = loadFont("assets/Roboto-Medium.ttf");
    fontBold = loadFont("assets/Roboto-Bold.ttf");
}

function setup() {
    Matter.use(
        'matter-attractors' // PLUGIN_NAME
    );
    engine = Engine.create();
    curMonthString = numToDate(curMonth);
    world = engine.world;
    canvas = createCanvas(550, 550);
    mouse = Matter.Mouse.create(canvas.elt);
    //mouseCollider = Bodies.circle(mouse.position.x, mouse.position.y, 1);
    //World.add(world, mouseCollider);
    mouse.pixelRatio = pixelDensity();
    textAlign(CENTER);
    world.gravity.y = 0;
    world.gravity.x = 0;
    //Engine.run(engine);
    numClubs = Object.keys(dataSet).length;
    //console.log(numClubs);
    //createDiv();
    slider = createSlider(0, maxMonth, 0, 1);
    slider.style("height", "75px");
    slider.style("display", "block");
    slider.style("margin", "auto");
    //colorMode(HSB, 255);
    
  var attractiveBody = Bodies.circle(width/2,height/2,1, {
          isStatic: true,

          // example of an attractor function that 
          // returns a force vector that applies to bodyB
          plugin: {
              attractors: [
                function(bodyA, bodyB) {
                      return {
                          x: (bodyA.position.x - bodyB.position.x) * 2e-6,
                          y: (bodyA.position.y - bodyB.position.y) * 2e-6,
                      };
                }
      ]
          }
      });
    World.add(world, attractiveBody);
    for (var i = 0; i < numClubs; i++) {
        //Randomly decide where to place it offscreen
        var side = floor(random(5))
        var x;
        var y;
        var space = 80;
        if(side == 1){ //North
            y = -space;
            x = random(0,width);
        }
        if(side == 2){//West
            x = -space;
            y = random(0, height);
        }
        if(side == 3){//East
            x = width + space;
            y = random(0, height);
        }
        if(side == 4){//South
            y = height+space;
            x = random(0,width);
        }
        circles.push(new Circle(x,y, 5, dataSet[i]));
    }

}

    function draw() {
        if(curMonth > maxMonth) curMonth = 0;
        if(curMonth != slider.value()){
            curMonth = slider.value();
            curMonthString = numToDate(curMonth);
        }
        
        //console.log(curMonth);
        background(51);
        
//        var Body = [];
//        Matter.Query.point(Body, mouse.position);
//        console.log(Body);

        Engine.update(engine);
        for (var i = 0; i < circles.length; i++) {
            circles[i].show();
        }
        //graphics stuff: display all the text that's needed to be shown, seeing if the mouse is colliding with a circle, in which 
        fill(255);
        textSize(15);
        if(mouse.absolute.x < width-edgeBuffer && mouse.absolute.y < height-edgeBuffer && mouse.absolute.x > edgeBuffer && mouse.absolute.y > edgeBuffer){
            var query = Matter.Query.point(world.bodies, mouse.position); //checks whether something exists at mouse's location
            if(query != 0){
                //console.log(query[0].label2);
                textFont(fontRegular);
                textAlign(LEFT);
                noStroke();
                text(query[0].label+" - "+query[0].label2, 20, height-20);
            }
        }
        textFont(fontRegular);
        textAlign(RIGHT);
        textSize(15);
        noStroke();
        text(curMonthString, width-20, height-20);
        
    }

    function numToDate(num){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var yearPart = floor(num/12) + 2004;
        var monthPart = num % 12;
        return months[monthPart] + " " + yearPart;
    }