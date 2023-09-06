import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  // renderiza el valor
  const [board, setBoard] = useState(() => {
    //guarda el valor en el localStorage
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
})
  
  const [turn, setTurn] = useState(TURNS.x)
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  // Función para volver a iniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const updateBoard = (index) => {

    // si existe algo en el div
    // no sobreescribas
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn ==TURNS.x ? TURNS.O : TURNS.x
    setTurn(newTurn)
    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner) 
      } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  } 
}

  return (
    <main className="board">
      <button onClick={resetGame}>Reset del juego</button>
      <h1>Tic tac toe</h1>
    <section className="game">
      {
        board.map((square, index) => {
          return (
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
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

    <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )


export default App;
