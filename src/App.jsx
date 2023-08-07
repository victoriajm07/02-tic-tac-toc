import { useState } from "react"

const turns = {
  x: 'x',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className =`square ${isSelected ? 'selected' : ''}`
  
  const handleClick = () => {
    updateBoard()
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [

]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [turn, setTurn] = useState(turns.x)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
          boardToCheck[a] == boardToCheck[b]&&
          boardToCheck[a] == boardToCheck[c]
          ){
            return boardToCheck[a]
          }
    }
  }

  const updateBoard = (index) => {

    // si existe algo en el div
    // no sobreescribas
    if (board[index]) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn ==turns.x ? turns.O : turns.x
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner((preWinner) => {
        return newWinner
      })
    }
  }

  return (
    <main className="board">
    <h1>Tic tac toe</h1>
    <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className="turn">
      <Square isSelected ={turn == turns.x}>
        {turns.x}
      </Square >
      <Square isSelected ={turn == turns.O}>
        {turns.O}
      </Square>
    </section>
    </main>
  )
}

export default App;
