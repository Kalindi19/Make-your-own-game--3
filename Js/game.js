class Game{
    constructor(){

    }
    getState(){
        database.ref("gameState").on("value",function (data){
            gameState=data.val();
        })
    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }

    async start(){
        if(gameState==0){
            background(bg);

            player=new Player();
            var playerCountref=await database.ref('playerCount').once("value");
            if(playerCountref.exists()){
                playerCount=playerCountref.val();
                player.getCount();
            }

            form=new Form();
            form.display();
        }

        player1=createSprite(100,200);
        player1.addImage(player1IMG);
        player2=createSprite(300,200);
        player2.addImage(player2IMG);
        player3=createSprite(500,200);
        player3.addImage(player3IMG);
        player4=createSprite(700,200);
        player4.addImage(player4IMG);

        player=[player1,player2,player3,player4];
    }

    play(){
        form.hide();
        Player.getPlayerinfo();
        player.getCarsAtEnd();
    
        if(allPlayers!==undefined){
            background(bg2)
            image(bg2,0,-height*5,width*10,height);

            var index =0;
            index = index+1;
            if(index === player.index){
                text(allPlayers[plr].name,x-25,y+25);
              }
        }

      
        drawSprites();

        if(keyIsDown(UP_ARROW)&& player.index!==null){
            player.y=-50;
            player.update();
        }


        if(keyIsDown(DOWN_ARROW)&& player.index!==null){
            player.y=+50;
            player.update();
        }

        if(keyIsDown(RIGHT_ARROW)&& player.index!==null){
            player.x=+50;
            player.update();
        }

        if(player.distance>=3500){
            gameState=2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
        }
    }

    spawnObstacles(){
        if(frameCount % 100 === 0) {
            var obstacle = createSprite(allPlayers.x-500,height/2,10,40);
            obstacle.velocityX = -(6 + 3*distance/100);
           
            //generate random obstacles
            var rand = Math.round(random(1,3));
            switch(rand) {
              case 1: obstacle.addImage(obstacleImg1);
                      break;
              case 2: obstacle.addImage(obstacleImg2);
                      break;
              case 3: obstacle.addImage(obstacleImg3);
                      break;
              default: break;
            }
            
            //assign scale and lifetime to the obstacle           
            obstacle.scale = 0.1;
            obstacle.lifetime = 1000;
            obstacle.setCollider("circle",0,0,20);
            //add each obstacle to the group
            obstaclesGroup.add(obstacle);
          }
    }


    end(){
        if(gameState===2){
        stroke("black");
        strokeWeight(5);
        fill(255,178,140);
        rectMode(CENTER);
        rect(width/2,players[player.index-1].y,300,300);
        fill("black");
        textSize(30);
        strokeWeight(2);
        text("Game-Over",width/2-80,players[player.index-1].y-50);
        text(player.name + ': '+ player.rank,width/2-80,players[player.index-1].y+20);
        }
    }
}