class upgrade{
    
    constructor(cost, value){
        this.__cost = cost;
        this.__num = 0;
        this.__value = value;
        

    }
    getcost(){
        return Math.floor(this.__cost+this.__cost*this.__num*(this.__num/10));
    };
    getnum(){
        return this.__num;
    };
    getvalue(){
        return this.__value*this.__num;
    };
    buy(){
        this.__num += 1;
    }
}

var data = {
    score :0,
    perClick:1,
    critical:1,
    criticalChance:0,
    goblins:new upgrade(20,1),
    gnomes:new upgrade(50,2),
    powerClick:new upgrade(100,1),
    chestOpeningPunches:new upgrade(200,2),
    criticalStrikes:new upgrade(400,1),
    devilDealer:new upgrade(666,33),
    luckyMimic:new upgrade(15000,2),

}

//calculations every time you click the main button
document.querySelector(".theClick").onclick = () => {
    if(data.criticalChance>=Math.floor(Math.random()*1000)){
        data.score += data.perClick*data.critical*100 ;
    }else{
        data.score += data.perClick
    }
}
upgradebuttons = document.querySelectorAll(".upgradeButton");

function buyUpgButtSetup(upgrade,button) {
    if(data.score>=upgrade.getcost()){      
        data.score -= upgrade.getcost();
        upgrade.buy();
        button.querySelector(".number").innerText = upgrade.getnum();
        button.querySelector(".cost").innerText = upgrade.getcost();
    }
}
//manages the upgrea buttons actions
upgradebuttons.forEach(button => {
    button.onclick = () =>{
        switch (button.querySelector(".upgradesText").innerText) {
            case "goblins" :
                buyUpgButtSetup(data.goblins,button);
                break;
            case "gnomes" :
                buyUpgButtSetup(data.gnomes,button);
                break;

            case "devilDealer" :
                buyUpgButtSetup(data.devilDealer,button);
                break;

            case "luckyMimic" :
                buyUpgButtSetup(data.luckyMimic,button);
                break;
                
            case "save":
                localStorage["data"] = JSON.stringify(data);
                break;
                    
            case "powerClick" :
                if(data.score>=data.powerClick.getcost()){
                    buyUpgButtSetup(data.powerClick,button);
                    data.perClick +=1;
                }
                break;
            case "chestOpeningPunches" :
                if(data.score>=data.chestOpeningPunches.getcost()){
                    buyUpgButtSetup(data.chestOpeningPunches,button);
                    data.perClick +=2;
                }
                break;
            case "criticalStrikes" :
                if(data.score>=data.criticalStrikes.getcost()){
                    buyUpgButtSetup(data.criticalStrikes,button);
                    data.critical +=5;
                    if(data.criticalStrikes.getnum()%50==0){data.criticalChance+=1;}
                }
                break;
        }
    }
});
//passive income
setInterval(() => {
    data.score += data.goblins.getvalue() + data.gnomes.getvalue() + data.devilDealer.getvalue() * Math.max(1,data.luckyMimic.getvalue());
}, 2000); 
function loop(){
    window.requestAnimationFrame(loop);
    document.querySelector("#score").innerText = data.score;
}
loop();

