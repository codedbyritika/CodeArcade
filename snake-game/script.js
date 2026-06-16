//all game variables 
let inputDir = { x: 0, y: 0 } //initial position of snake
let speed = 7;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//all sounds for the game
let foodSound = new Audio("./assets/food.mp3");
let gameOverSound = new Audio("./assets/gameover.mp3");
let moveSound = new Audio("./assets/move.mp3");
let bgSound = new Audio("./assets/music.mp3");




//---------------------------------main Game logic ---------------------------------
//to run the game in the loop
window.requestAnimationFrame(main);
function main(currTime) {
    window.requestAnimationFrame(main);
    //console.log(currTime)
    if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currTime;
    gameEngine();

}


window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 }//game start
    moveSound.play();
    switch ((e.key)) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})



//---------------------------------------------game function----------------------
function gameEngine() {
     bgSound.play();
    //update snake location

    //part 1 updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        bgSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to play again")
        snakeArr = [{ x: 13, y: 15 }];
        bgSound.play();
        score = 0;
         scoreBox.innerHTML = "Score: " + score;
    }

    //if food eaten -> then increase the score and regenerate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x == food.x) {
        foodSound.play()
        score++;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })//append new body of snake

        //new food location 
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    //moving the snake
    // from last keeping one parts of snake body on other part and updating head only 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //part 2 display the snake and game 
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, idx) => {
        snakeElement = document.createElement("div");

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;


        if (idx === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }



        board.appendChild(snakeElement);

    });


    //create food for snake
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function isCollide(snake) {
    // condn:1->if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //condn:2->the boundary condition
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}


