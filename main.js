let backgroundKolom = "inherit";
let backgroundResetKolom = "red";
let colorWinning = "green";
let kolom = document.getElementsByClassName("kolom");
let notif = document.getElementsByClassName("notif");
let playBtn = document.getElementById("play");
let screen = document.getElementsByClassName("screen");
let title = document.getElementsByClassName("title");
let turnLength = 1;
const rules = [
    "123",
    "456",
    "789",
    "147",
    "258",
    "369",
    "159",
    "357"
];

setInterval(function(){
    console.log("checking...");
    checkTurn(turnLength);
},2000);

Object.keys(kolom).forEach(element => {
    kolom[element].addEventListener("click",function(){
        onPlay(kolom[element]);
    });
});

playBtn.addEventListener("click",startPlay);

function startPlay(){
    screen[0].style.display="none";
    Object.keys(kolom).forEach(element => {
        kolom[element].innerText="";
        kolom[element].style.backgroundColor=backgroundKolom;
    });
    turnLength=1;
}

function checkTurn(turn){
    if(turn%2<=0){
        computerTurn();
    }
}

function computerTurn(){
    let circleTurn = "";
    let crossTurn = "";
    let div=[];
    let num=0;
    Object.keys(kolom).forEach(element => {
        if(kolom[element].childNodes.length==0){
            div[num] = kolom[element]; 
            num++;
        }else{
            if(kolom[element].childNodes[0].classList.contains("circle")){
                circleTurn += kolom[element].id;
            }else{
                crossTurn += kolom[element].id;
            }
        }
    });
    let data = [crossTurn,circleTurn];

    for(var i = 0;i<data.length;i++){
        if(data[i]!=""){
            for(var z = 0;z<rules.length;z++){
                let thisArray = data[i].split("");
                var totalStep = 0;
                for(var y = 0;y<thisArray.length;y++){
                    if(rules[z].match(thisArray[y])){

                        console.log(totalStep+=1);
                        console.log(thisArray);
                        console.log(rules[z]);
                        if(totalStep==2){
                            
                            let rulesNew = rules[z].split("");
                            for(var x=0;x<rulesNew.length;x++){

                                let choose = document.getElementById(rulesNew[x]);

                                if(choose.childNodes.length==0){
                                    console.log("ai:"+choose);
                                    return onPlay(choose);
                                }

                            }

                        }
                    }
                }
            }
        }
    }

    //computer decision
    console.log("rand2"+div[Math.floor(Math.random()*div.length)]);
    onPlay(div[Math.floor(Math.random()*div.length)]);
}

function onPlay(a){
    let circleStep,crossStep = "";
    let availableCol = 9;
    let checkChild = a.childNodes.length;
    if(checkChild==0){
        let node = createEl(turnLength);
        a.appendChild(node);
        turnLength++;
        Object.keys(kolom).forEach(element => {
            let kolomChild = kolom[element].childNodes;
            if(kolomChild.length>0){
                if(kolomChild[0].classList.contains("circle")){
                    circleStep += kolom[element].id;
                }else{
                    crossStep += kolom[element].id;
                }
                availableCol--;
            }
        });

        let status = check([circleStep,crossStep]);

        if(status!="continue"){
            return gameover(status);
        }

        if(availableCol==0){
            resetBoard();
        }

    }

}

function check(steps){
    let status="continue";
    for (var a = 0;a<steps.length;a++){
        for(var i = 0;i<rules.length;i++){
            let circleScore = 0;
            let crossScore = 0;
            let rulesKey = rules[i].split("");
            for(var z=0;z<rulesKey.length;z++){
                if(steps[a].includes(rulesKey[z])){
                    if(a==0){
                        circleScore++;
                        if(circleScore==3){
                            markTheSquare(rules[i]);
                            status = "Circle Menang";
                            return status;
                        }    
                    }else{
                        crossScore++;
                        if(crossScore==3){
                            markTheSquare(rules[i]);
                            status = "Cross Menang";
                            return status;
                        }
                    }
                }
            }
        }
    }
    return status;
}

function markTheSquare(rules){
    let array = rules.split("");
    Object.keys(array).forEach(element => {

        if(document.getElementById(array[element]).childNodes[0].classList.contains("circle")){
            document.getElementById(array[element]).childNodes[0].style.borderColor="green";
        }else{
            document.getElementById(array[element]).childNodes[0].childNodes[0].style.backgroundColor="green";
            document.getElementById(array[element]).childNodes[0].childNodes[1].style.backgroundColor="green";
        }
        
    });
}

function resetBoard(){
    Object.keys(kolom).forEach(element => {
        kolom[element].style.backgroundColor = backgroundResetKolom;
    });
    setTimeout(function(){
        Object.keys(kolom).forEach(element => {
            kolom[element].innerText = "";
            kolom[element].style.backgroundColor = backgroundKolom;
        });
        turnLength=1;
    },1000);
}

function gameover(status){
    screen[0].style.display="flex";
    title[0].innerText=status;
    turnLength=1;
}

function createEl(turn){
    let result,crossOne,crossTwo;
    if(turn%2>0){
        result = document.createElement("div");
        result.classList.add("circle");
    }else{
        result = document.createElement("div");
        result.classList.add("crossFull");
        crossOne = document.createElement("div");
        crossOne.classList.add("cross");
        crossOne.classList.add("crossOne");
        crossTwo = document.createElement("div");
        crossTwo.classList.add("cross");
        crossTwo.classList.add("crossTwo");
        result.appendChild(crossOne);
        result.appendChild(crossTwo);
    }
    return result;
}

