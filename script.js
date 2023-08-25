var audio = document.getElementById("myaudio");
  audio.volume = 0.2;

  function unmute(){
    audio.muted= false ;
    console.log("unmuted")
  }

  window.onload = unmute();
  
function getPlayerChoice() {
    var rock = document.getElementById("prock");
    var paper = document.getElementById("ppaper");
    var scissors = document.getElementById("pscissors");

    return new Promise((resolve) => {
        rock.addEventListener("click", function () {
            resolve("rock");
        });

        paper.addEventListener("click", function () {
            resolve("paper");
        });

        scissors.addEventListener("click", function () {
            resolve("scissors");
        });
    });
}
function displayRock(){
    document.getElementById("crock").style.display = "block";
}
function displayScissors(){
    document.getElementById("cscissors").style.display = "block";
}
function displayPaper(){
    document.getElementById("cpaper").style.display = "block";
}

function getComputerChoice() {
    return new Promise((res)=>{
        var a = Math.random();
    if (a > 0 && a < 0.33) {
        displayRock();
        setTimeout(function(){
        res("rock");},1000);
    } else if (a > 0.33 && a < 0.66) {
        displayPaper();
        setTimeout(function(){
        res("paper");},1000);
    } else {
        displayScissors();
        setTimeout(function(){
        res("scissors");},1000);
    }
    })
    
}

async function main() {
    var computerScore=0;
    var playerScore=0;
    var p = document.getElementById("playerscore");
    var c = document.getElementById("computerscore");
    let round=1;
    while(playerScore<5 && computerScore<5){
        round++;
        document.getElementById("cscissors").style.display = "none";
        document.getElementById("cpaper").style.display = "none";
        document.getElementById("crock").style.display = "none";
    try {
        const playerChoice = await getPlayerChoice();
        console.log("Player's choice:", playerChoice);
        var computerChoice = await getComputerChoice()
        const result = playRound(playerChoice, computerChoice);
        if(result==1){
            playerScore++;
            p.textContent= `Player's Score ${playerScore}` ;
        }else if(result==-1){
            computerScore++;
            c.textContent= `Computer's Score ${computerScore}`
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

console.log("Score",playerScore,computerScore)
if(playerScore>computerScore){
    document.getElementById("pwin").style.display = "block";
    document.querySelector(".win").style.display="flex";
}else if(computerScore>playerScore){
    document.getElementById("cwin").style.display = "block";
    document.querySelector(".win").style.display="flex";
}else{
    document.querySelector(".win").style.display="block";
    document.getElementById("draw").style.display="flex";
}
setTimeout(() => location.reload(), 3000);
}

function playRound(playerChoice, computerChoice) {
    console.log(playerChoice, computerChoice);
    if (playerChoice === computerChoice) {
        console.log(playerChoice, computerChoice);
        return 0;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        return 1;
    } else {
        return -1;
    }
}

main();

