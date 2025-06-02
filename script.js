const startFormEl = document.querySelector("#startForm")
const boardEl = document.querySelector("#board")
const currentEl = document.querySelector("#current")
const resultEl = document.querySelector("#result")
const restartBtnEl = document.querySelector("#restart")
const newPlayersEl = document.querySelector("#newPlayers")


const Game = (function(){
    const player1 = createPlayer()
    const player2  = createPlayer()
    let lastPlayers = []
    let currentPlayer = player1
    let winnerArray =[]
    //displayController.showCurrentPlayer(currentPlayer.getName(),currentPlayer.getMarker())
    const winningPositions = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]
    let winner
    const start = (player1Name,player1Mark,player2Name,player2Mark) => {
        if(player1Mark === player2Mark){
            alert("Change Player marks")
            return
        }
        lastPlayers = [player1Name,player1Mark,player2Name,player2Mark]
        // save to localStorage
        winner = null
        winnerArray = []
        Gameboard.resetBoard()
        player1.setMarker(player1Mark)
        player2.setMarker(player2Mark)
        player1.setName(player1Name)
        player2.setName(player2Name)
        displayController.showBoard(Gameboard.getBoard())
        displayController.showCurrentPlayer(currentPlayer.getName(),currentPlayer.getMarker())
    }
    const play = (position) => {
        if(currentPlayer.getMarker() ===""){
            console.log("Start or restart the game!")
            return
        }else if(checkPosition(position)){
            Gameboard.placeMarker(currentPlayer.getMarker(),position)
            currentPlayer.addPosition(position)
            if(currentPlayer.getPositions().length >=3){
                checkWinner()
                if(winner) { 
                    endGame()
                    return
                }
                checkTie()
            }
            currentPlayer = player1.getMarker() === currentPlayer.getMarker() ? player2 : player1
            displayController.showBoard(Gameboard.getBoard())
            displayController.showCurrentPlayer(currentPlayer.getName(),currentPlayer.getMarker())
        }
    }
    const checkPosition =(position) => {
        const currentBoard = Gameboard.getBoard()
        if(currentBoard[position]){  
            //console.log("Position ", position, "already has ", currentBoard[position])
            return false  
        }
        return true

    }
    const checkWinner = (player=currentPlayer) => {
        winningPositions.forEach(el => {
            if(el.every(item => player.getPositions().includes(item))){
                winnerArray = el
                displayController.showBoard(Gameboard.getBoard())
                winner = player
                //console.log(winner)
            }
        })
    }
    const checkTie = () => {
        const currentBoard = Gameboard.getBoard()
       if(currentBoard.every(item => Boolean(item) === true) && !winner){
        endGame()
       }
       
    }
    const endGame = () => {
       
        if(winner){
            displayController.showResult(winner.getName(),winner.getMarker())
            displayController.showBoard(Gameboard.getBoard(),winnerArray)
            displayController.toggleRestart()
        }else{
            displayController.showResult()
            displayController.toggleRestart()
        }
        player1.setMarker("")
        player2.setMarker("")
        player1.setName("")
        player2.setName("")
        player1.resetPositions()
        player2.resetPositions()
        Gameboard.resetBoard()
    }
    const reset = () => {
       player1.setMarker(lastPlayers[1]|| "")
       player2.setMarker(lastPlayers[3] || "")
       player1.setName(lastPlayers[0] || "")
       player2.setName(lastPlayers[2]|| "")
       currentPlayer = player1
       displayController.showBoard(Gameboard.getBoard())
       displayController.showCurrentPlayer(currentPlayer.getName(),currentPlayer.getMarker())
       displayController.hideResult()
       displayController.toggleRestart()
       winner = null
       winnerArray = []
    }
    const getNewPlayers = () => {
        displayController.showStartForm()
    }
    return{start, play,reset, getNewPlayers}
})()

const Gameboard = (function(){
    let boardArray = new Array(9).fill(null)
    const getBoard = () => boardArray 

    const placeMarker = (marker, position) =>{
        boardArray[position] = marker
    }
    const resetBoard = () => {
        boardArray = new Array(9).fill(null)
    } 
    return {getBoard, placeMarker,resetBoard}
})()
function createPlayer(){
    let marker = ""
    let name = ""
    let positions = []

    const setMarker = (newMarker) => {
        marker = newMarker
    }
    const getMarker = () => marker

    const getName = () => name 

    const setName = (newName) => [
        name = newName
    ]

    const addPosition = (newPosition) => {
        positions.push(+newPosition || 0)
    }
    const resetPositions = ()=>{
        positions = []
    }
    const getPositions = () => positions
    return {getMarker, setMarker, addPosition, getPositions, getName, setName, resetPositions}
}

const displayController = (function(){
    const showBoard = (boardArray, winnerArray=null)=> {
        boardEl.style.display = "grid"
        startFormEl.style.display = "none"
        boardEl.innerHTML = ""
        boardArray.forEach((el,index) => {
            const cellEl = document.createElement("div")
            cellEl.setAttribute("data-position", index)
            cellEl.classList.add("cell")
            cellEl.textContent = el ? el : ""
            boardEl.appendChild(cellEl)
        })
        if (winnerArray) {
            const allCells = [...document.querySelectorAll(".cell")]
            console.log("winnerArray", winnerArray)
            const winnerCells =  allCells.filter(item => winnerArray.includes(+item.getAttribute("data-position")))
            winnerCells.forEach(item => {
                item.classList.add("bg-success")
                item.classList.add("text-white")
            })
        }
        
    }

    const showCurrentPlayer = (fullName,mark) => {
        currentEl.innerHTML = ""
        const currentSpanEl = document.createElement("span")
        currentSpanEl.textContent = `${fullName} (${mark})`
        currentEl.textContent = "Current Player: "
        currentEl.classList.add("btn")
        currentEl.appendChild(currentSpanEl)
        currentEl.style.display = "block"

    }
   

    const showResult = (winnerName="",winnerMarker="") => {
       
        resultEl.textContent = ""
        resultEl.style.display= "block"
        if(winnerName === "") { 
            resultEl.textContent = "It's a tie!"
            
        }else{
            resultEl.classList.add("success")
            resultEl.textContent = `Winner: ${winnerName} (${winnerMarker})`
        }


        

    }
    const hideResult = () => {
        resultEl.style.display = "none"
    }
    const toggleRestart = () => {
        restartBtnEl.classList.toggle("hidden")
        newPlayersEl.classList.toggle("hidden")
    }
    const showStartForm = () => {
        startFormEl.style.display="flex"
        boardEl.style.display = "none"
        toggleRestart()
        resultEl.style.display = "none"
        currentEl.style.display = "none"
    }

    return {showBoard, showCurrentPlayer, showResult,toggleRestart, showStartForm,hideResult}

})()

startFormEl.addEventListener("submit", (e) => {
    e.preventDefault() 
    const formData = new FormData(startFormEl)
    Game.start(formData.get("player1Name"), formData.get("player1Mark"),formData.get("player2Name"),formData.get("player2Mark"))
    startFormEl.reset()
})

boardEl.addEventListener("click", (e) => {
    console.log(e.target)
    const position =  e.target.getAttribute("data-position")
    if(position){
        Game.play(position)
    }
})
restartBtnEl.addEventListener("click",()=>{
    Game.reset()
})
newPlayersEl.addEventListener("click", () => {
    Game.getNewPlayers()
})