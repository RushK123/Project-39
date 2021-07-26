/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, trex_running, trex_collided;
var jungle, invisiblejungle;

var invGround, shrub;

var obstacles, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;


  kangaroo = createSprite(92, 300, 50,50)
  kangaroo.addAnimation("kanga",kangaroo_running);
  kangaroo.scale = 0.14;


  kangaroo.setCollider("circle", 0, 0, 300);


  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  

  invGround = createSprite(400,371, 800, 20)
  invGround.visible = false;

  score = 0;

}

function draw() {
  background(255);
  
  kangaroo.x = camera.position.x - 270;

  if (gameState === PLAY){
    jungle.velocityX = -2;
    if (jungle.x < 0) {
      jungle.x = width / 2;
    }

    if (keyDown("space")){
      kangaroo.velocityY = -11; 
    }
      kangaroo.velocityY += 0.5;
      kangaroo.collide(invGround);

    if (frameCount % 150 == 0){
      spawnShrubs();
      spawnObstacles();
    }
  }

  if (gameState === END){
    jungle.velocityX = 0;
    text("Press Up arrow to reset", windowWidth/2, 50);  
    kangaroo.destroy();

    if (keyCode === UP_ARROW ){
      reset();
    }
    
  } 

  else if (gameState = WIN){
    jungle.velocityX = 0;
    kangaroo.velocityX = 0;



    //kangaroo.changeAnimation("collided", kangaroo_collided);


  }




  drawSprites();

  textSize(20);
  stroke (3);
  fill ("black");
  text ("Score: "+ score, windowWidth/2, 50);

  if (score >= 5){

    kangaroo.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congrats! You won!", 70, 200);
    gameState = WIN
  }

}


function spawnShrubs(){
  shrub = createSprite(550, 330, 40, 10);
  shrub.addImage("shrub", shrub1);
  shrub.scale = 0.1;
  shrub.velocityX = -2;
  shrub.lifetime = 160
  if (kangaroo.isTouching(shrub)){
    shrub.destroy();
    
  }

}

function spawnObstacles(){
  obstacles = createSprite(670, 330, 40, 10);
  obstacles.addImage("s", obstacle1);
  obstacles.scale = 0.1;
  obstacles.velocityX = -2;
  obstacles.lifetime = 400;
  if (kangaroo.isTouching(obstacles)){
    gameState = END
  }

}


function reset(){
  gameState = PLAY;

}