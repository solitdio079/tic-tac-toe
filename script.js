console.log("Welcome to the Tic Tac Toe Game!")

const Gameboard = (function(){
    const gameboardArray = new Array(9)
    let lastMark = ""
    
    const getBoard = () => gameboardArray
    const placeMark = (mark,index) => {
        if(mark !== lastMark){  
            gameboardArray[index] = mark 
            lastMark = mark
        }

    }
    const getLastMark = () => lastMark
    const setLastMark = (mark) => {
        lastMark = mark
    }
    return {getBoard, placeMark, getLastMark}

})()



const createPlayer = function(initName){
    let mark = ""
    let positions = []
    let name = initName
    let lastPosition

    const setMark = (playerMark) => {
        mark = playerMark
    }
    const getMark = () => mark

    const placeMark = (position) => { 
        lastPosition = position
        return [getMark(),position] 
    }
    const addPosition = (position) => {
        positions.push(position)
    }

    const getName = () => name
    const setName = (playerName) => {name=playerName}

    const getPostions = () => positions
    const getLastPosition = () => lastPosition

    return {getMark,setMark,placeMark, getPostions, getName, setName,getLastPosition, addPosition}
}
const player1 = createPlayer("Player 1")
const player2 = createPlayer("Player 2")
player1.setMark("W")
player2.setMark("Y")
Gameboard.placeMark(...player1.placeMark(0))
if(Gameboard.getBoard()[player1.getLastPosition()] === player1.getMark()) player1.addPosition(player1.getLastPosition())
Gameboard.placeMark(...player2.placeMark(1))
if(Gameboard.getBoard()[player2.getLastPosition()]  === player2.getMark()) player2.addPosition(player2.getLastPosition())
Gameboard.placeMark(...player1.placeMark(2))
if(Gameboard.getBoard()[player1.getLastPosition()]  === player1.getMark()) player1.addPosition(player1.getLastPosition())
Gameboard.placeMark(...player1.placeMark(3))
if(Gameboard.getBoard()[player1.getLastPosition()]  === player1.getMark()) player1.addPosition(player1.getLastPosition())

console.log(Gameboard.getBoard())

console.log(player1.getPostions())
console.log(player2.getPostions())

const Gameflow = (function(){

})()