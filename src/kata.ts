class Game {
  playerOne: Player;
  playerTwo: Player;
  scoreValues: number[] = [0, 15, 30, 40];
  
  constructor(nameOne: string, nameTwo: string){
    console.log("init game creation");
    this.playerOne = new Player(nameOne);
    this.playerTwo = new Player(nameTwo);
    document.querySelector("#players").innerHTML = nameOne + " contre " + nameTwo;
    document.querySelector("#scores").innerHTML = this.evaluateScore();
    console.log("game created");
  }
	
  playerOneScores(){
    this.playerOne.playerScores();
    document.querySelector("#scores").innerHTML = this.evaluateScore();
    if(this.evaluateScore().indexOf("victoire") !== -1){
    	document.getElementById("addPoints").hidden = true;
    }
  }
  playerTwoScores(){
    this.playerTwo.playerScores();
    document.querySelector("#scores").innerHTML = this.evaluateScore();
    if(this.evaluateScore().indexOf("victoire") !== -1){
    	document.getElementById("addPoints").hidden = true;
    }
  }
  evaluateScore(){
    const scoreP1 = this.playerOne.getScore();
    const nameP1 = this.playerOne.getName();
    const scoreP2 = this.playerTwo.getScore();
    const nameP2 = this.playerTwo.getName();
    
    if(scoreP1 == scoreP2 && scoreP1 >= 3){
      return "Deuce";
    } else if(scoreP1 <= 3 && scoreP2 <= 3){
      return this.scoreValues[scoreP1] + " " + this.scoreValues[scoreP2]; 
    }
    if(scoreP1 > scoreP2){
      return ((scoreP1 == scoreP2 + 1)? "avantage " : "victoire ") + nameP1;
    }
    if(scoreP1 < scoreP2){
      return ((scoreP1 + 1 == scoreP2)? "avantage " : "victoire ") + nameP2;
    }
  }
}

class Player {
  private name: string;
  private score: number = 0;
  
  constructor(myName: string){
    this.name = myName;
  }
  
  playerScores(){
    this.score += 1;
  }
  getName(){
    return this.name;
  }
  getScore(){
    return this.score;
  }
}

document.getElementById("createBtn").addEventListener("click", (event) => {
  createGame(document.getElementById("playerOneName").value, document.getElementById("playerTwoName").value);
});
document.getElementById("addPoints").hidden = true;

function createGame(nameOne: string, nameTwo: string){
  if(nameOne.length > 0 && nameTwo.length > 0){
    let myGame = new Game(nameOne, nameTwo);
    initGame(myGame, nameOne, nameTwo);
  }
}

function initGame(game, nameOne, nameTwo){
  document.getElementById("create").hidden = true;
  document.getElementById("addPoints").hidden = false;
  document.getElementById("pOneScores").value = "point " + nameOne;
  document.getElementById("pTwoScores").value = "point " + nameTwo;
  document.getElementById("pOneScores").addEventListener("click", (e) => {
    game.playerOneScores();
    console.log("p1scored");
  });
  document.getElementById("pTwoScores").addEventListener("click", (e) => {
    game.playerTwoScores();
    console.log("p2scored");
  });
}
