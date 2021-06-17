class Player{
    constructor(){
        this.index=null;
        this.distance=0;
        this.name=null;
        this.rank=null;
    }
    getCount(){
        database.ref("playerCount").on("value",function (data){
            playerCount=data.val();
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount:count
        })
    }

    update(){
        database.ref("players/player"+this.index).set({
            name:this.name,
            distance:this.distance
        
        })
    }

    static getPlayerinfo(){
        database.ref('players').on("value",(data)=>{
            allPlayers=data.val();
        })
    }

    getCarsAtEnd(){
        database.ref('carsAtEnd').on("value",(data)=>{
            this.rank=data.val();
        })

    }

    static updateCarsAtEnd(rank){
        database.ref('/').update({
            carsAtEnd:rank
        })

    }


}