let gameSeq=[];
let userSeq=[];
let btns=["red","green","yellow","blue"];

//initial conditions
let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game has started");
        started=true;

        levelUp();
    }
})

//fucntion for flashing a button
//add a flash class that makes its bg color white and then after some time remove that class and get back its org color
function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},300);
}

//when user press right button it will be green
function userflash(btn){
btn.classList.add("userflash");
setTimeout(function(){
    btn.classList.remove("userflash");
},300);
}


function levelUp(){
    //reset the user sequence
    userSeq=[]
  level++;
  h2.innerText= `Level ${level}`;
  //generating a random number to flash the button
  let randIdx=Math.floor(Math.random()*3);
  let randColor=btns[randIdx];
  //accesing the class of that random color
  let randBtn=document.querySelector(`.${randColor}`);
  gameSeq.push(randColor)
  console.log(gameSeq)
gameFlash(randBtn);

}

function checkAns(idx){
   if(userSeq[idx]==gameSeq[idx]){//two cases while checking equality of two colors
    if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000)
    }
   }else{
    h2.innerHTML=`Game Over: Your Score was <b>${level-1}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
         document.querySelector("body").style.backgroundColor="white";
    },200)
    reset();
   }
}
//function
function btnPress(){
let btn=this;
userflash(btn);
userColor=btn.getAttribute("id");
userSeq.push(userColor);
checkAns(userSeq.length-1);//check last idx color
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
btn.addEventListener("click",btnPress)
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

