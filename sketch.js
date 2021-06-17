var gameState=0;
var playerCount=0;
var database;
var form,player,game;
var allPlayers;
var players=[];
var bg,player1,player2,player3,player4,rules;
var player1IMG,player2IMG,player3IMG,player4IMG;
var obstacle1,obstacle2,obstacle3;
var obstacleImg1,obstacleImg2,obstacleImg3;

function preload(){
    bg=loadImage("images/bg.jpg");
    rules=loadImage("images/rules.jpg");
    coin=loadImage("images/coin.jpg");
    player1IMG=loadImage("images/player1.jpg");
    player2IMG=loadImage("images/player2.jpg");
    player3IMG=loadImage("images/player3.jpg");
    player4IMG=loadImage("images/player4.jpg");
    bg2=loadImage("images/bg2.jpg");
    obstacleImg1=loadImage("images/obstacle1.png");
    obstacleImg2=loadImage("images/obstacle2.png");
    obstacleImg3=loadImage("images/obstacle3.png");

}

function setup(){
    createCanvas(1000,500);
    database=firebase.database();
    
    game=new Game();
    game.getState();
    game.start();
}

function draw(){
    if(playerCount==4){
        game.updateState(1);
    }

    if(gameState==1){
        clear();
        game.play();
    }
    else if(gameState===2){
        game.end();
    }

}