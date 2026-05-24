console.log("welcome to tic tac toe");
let bgmusic = new Audio("./assets/music.mp3");
let audioturn = new Audio("./assets/ting.mp3");
let gameover = new Audio("./assets/gameover.mp3");
let isGameOver = false;

let turn = "X";


// X to O or vice versa
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

//function to check if player won the game or not

const checkWin = () => {
    let boxtext = document.querySelectorAll(".box-text");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {

            document.querySelector(".info").innerText = boxtext[e[0]].innerText + "  Won!!"
            isGameOver = true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "300px";
            gameover.play();
    
        }
    })
}

//------------------------Game logic----------------------------------------------------

bgmusic.play();
//applying event listeners on each box
let boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    let boxtext = box.querySelector(".box-text");
    box.addEventListener("click", () => {
        if (boxtext.innerText === '' && !isGameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioturn.play();
            checkWin();
            let isFilled = true;

            document.querySelectorAll(".box-text").forEach(box => {
                if (box.innerText === "") {
                    isFilled = false;
                }
            });

            if (isFilled && !isGameOver) {
                document.querySelector(".info").innerText = "Game Draw!";
                gameover.play();
            }
            else if (!isGameOver) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

//reset button

    let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    boxes.forEach(box => {
        let boxtext = box.querySelector(".box-text");
        boxtext.innerText = "";
    })
    turn = "X";

    document.querySelector(".info").innerText = "Turn for " + turn;
    isGameOver = false;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
})
