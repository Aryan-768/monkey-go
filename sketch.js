var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,obstacle,bananaImage,stoneImage;
var bananaGroup,obstacleGroup;
var gameOverImage,gameOver;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);

  score = 0;
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver= createSprite(400,150,800,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;

  obstacleGroup=new Group();
  bananaGroup=new Group();
  
  player.setCollider("rectangle",0,0,player.width,player.height);
  player.debug = true
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    gameOver.visible = false;
    player.visible = true
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  backgr.velocityX = -4;

    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
      score = score+2;
      player.scale += + 0.01;
    }
  }

  if(keyDown("space") ) {
    player.velocityY = -12;
  }


  player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

if(keyDown("r")){
gameState = PLAY;
}

   if(player.isTouching(obstacleGroup)){
     gameState = END;
   }else if(gameState === END){
    backgr.velocityX = 0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    bananaGroup.setvelocityX = 0;
    obstacleGroup.setvelocityX = 0; 
    gameOver.visible = true;
    player.visible= false;
    text("press r to restart",400,200)
    
   }

  banana();
  obstacle();

  drawSprites();

  stroke("white");
  fill("white");
  textSize(19)
  text("Score: "+ score,400,50);
}

function banana(){
  if(frameCount % 150 === 0){
    var banana = createSprite(900,100,40,10);
    banana.y = random(120,300);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth+1;
    bananaGroup.add(banana); 

 }
}

function obstacle(){
  if(frameCount % 150 === 0){
    var stone=createSprite(800,310,10,10);
    stone.addImage(stoneImage);
    stone.scale=0.27;
    stone.velocityX=-5;
    stone.lifetime=200;
  obstacleGroup.add(stone);
  }
}