import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
    // revisamos las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b]&&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // Si no se cumple cualquiera de las condiciones anteriores, retorna null
    return null
  }

// Función para revisar el final del juego
export const checkEndGame = (newBoard) =>  {
  // Revisamos si hay un empate
  // si no hay mas espacios vacíos
  //en el tablero
    return newBoard.every((square) => square !== null)
  }