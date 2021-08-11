const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground
var wall_right
var wall_left
var bridge
var jointPoint
var jointLink
var stones = []

function preload() {
  backgroundImg = loadImage("assets/background.png")
   zombieImg = loadImage("assets/zombie.png")
 
  leftToRightZombie = loadAnimation("./assets/zombie1.png", "./assets/zombie2.png", "./assets/zombie1.png");
  rightToLeftZombie = loadAnimation("./assets/zombie3.png", "./assets/zombie4.png", "./assets/zombie3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 8, width * 2, 20, "green")
  wall_left = new Base(170, height / 2 + 50, 600, 100, "brown")
  wall_right = new Base(width - 90, height / 2 + 50, 600, 100, "brown")

  
  bridge = new Bridge(30, { x: 50, y: height / 2 - 100 })
  
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20,"brown")

  Composite.add(bridge.body, jointPoint)
  jointLink = new link(bridge, jointPoint)

  for (var i = 0; i <= 20; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 100);
    var stone = new Stone(x, y, 40);
    stones.push(stone);
  }
  zombie = createSprite(width / 2, height - 110)

  zombie.addAnimation("leftToRight", leftToRightZombie);
  zombie.addAnimation("rightToLeft", rightToLeftZombie);
  zombie.addImage("zombieImg",zombieImg)
  
  zombie.scale = 0.1
  zombie.velocityX = 10
   
 

  breakbutton = createButton("")
  breakbutton.position(width - 250, height / 2 -50)
 
  breakbutton.class("breakbutton")
 
  breakbutton.mouseClicked(handleButtonPressed)

}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  drawSprites()
  ground.display()
  
  bridge.show()
  jointPoint.display()
  
   for(var stone of stones){
    stone.display()
    var pos = stone.body.position
    var distance = dist(zombie.position.x,zombie.position.y, pos.x,pos.y)
    if(distance <= 50){
      zombie.velocityX = 0
      Matter.body.setVelocity(stone.body,{x: 10, y: -10})
      zombie.changeImage("zombieImg")
      collid = true
    }
  }
  
  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;   
   zombie.changeAnimation("rightToLeft")
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
  zombie.changeAnimation("leftToRight")

  }
}
function handleButtonPressed() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500)
}