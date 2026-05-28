//all game variables 
let direction={ 
//initial position of snake
    x:0,
    y:0
}


//all sounds for the game
let foodSound=new Audio("food.mps3");
let gameOverSound=new Audio("gameover.mp3");
let moveSound=new Audio("move.mp3");
let bgSound=new Audio("music.mp3");

let speed=2;
let lastPaintTime=0;

let snakeArr=[
    {x:13,
        y:15}
]

food={x:6,
    y:7
}

//game function

function main(currTime){
     window.requestAnimationFrame(main);
     console.log(currTime)
     if((currTime-lastPaintTime)/1000<1/speed){
        return ;
     }
     lastPaintTime=currTime;  
     gameEngine(); 

}


function gameEngine(){
    //update snake location
    



    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,idx)=>{
       snakeElement=document.createElement("div");

       snakeElement.style.gridRowStart=e.y;
       snakeElement.style.gridColumnStart=e.x;

       
       if(idx===0){
         snakeElement.classList.add("head");
       }else{
        snakeElement.classList.add("snake");
       }

       
       board.appendChild(snakeElement);

    });


    //create food for snake
       foodElement=document.createElement("div");
       foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
       foodElement.classList.add("food");
       board.appendChild(foodElement);
}














//---------------------------------game logic -------------------

//to tun the game in the loop
window.requestAnimationFrame(main);
