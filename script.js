//Trabajando con el div con clase ".play-board"
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");

//Declarando mis variables de comida, serpiente y la velocidad. El arreglo es el cuerpo de la serpiente
let foodX, foodY;
let snakeX =8, snakeY = 8;
let snakeBody = [];
let velocityX = 0 , velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

highscoreElement.innerHTML = `High Score: ${highScore}`;

//Funcion que crea la posicion de comida de manera aleatoria
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Cambia la direccion dependiento de que flecha presiona
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!!!");
    location.reload();
}

//Funcion principal
const initGame = () => {
    if(gameOver) return handleGameOver();
    //Variable que crea comida en el grid
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //Condicional que hace aparecer en un recuadro un nuevo objeto de comida y hacer crecer a la serpiente
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerHTML = `Score: ${score}`;

        highscoreElement.innerHTML = `High Score: ${highScore}`;
    }

    for(let i = snakeBody.length -1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    snakeBody[0] = [snakeX, snakeY];
    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
