const Square = ({id, newState}) => {
  const [color, setColor] = React.useState('yellow');
  const [status, setStatus] = React.useState(null);
  const XorO = ['O', 'X'];

  const palette = ['blue', 'red', 'green']
  const getRandomColor = () => palette[Math.floor(Math.random()*2.9)]
  
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`)
  })

  return (
      <button 
        onClick={e => {
          let col = getRandomColor();        
          setColor(col);
          let nextPlayer = newState(id)
          setStatus(nextPlayer)
          e.target.style.background = col;
        }}
      >
        <h1>{XorO[status]}</h1> 
      </button>
  )
}

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null))

  let status = `Player ${player}`;
  let winner = checkWinner(state)
  if (winner != null){ status = `Player ${winner} wins`};

  const newState = idOfSquare =>{
    let thePlayer = player
    state[idOfSquare] = player;
    setState(state)
    let nextPlayer = (player +1) % 2;
    setPlayer(nextPlayer);
    return thePlayer
  }

  function checkWinner(state) {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] === state[b] && state[a] === state[c] && state[a]) {
        return state[a]
      }
    return null      
  }} 

  function renderSquare(i) {
    return <Square id={i} newState={newState}> </Square>;
  }
  return (
    <div
      className="game-board">
      <div className="grid-row"> 
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row"> 
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row"> 
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        {/* <button>Show/Hide Row</button>
        <button>Re-render Board</button> */}
        <h1>{status}</h1>
      </div>
    </div>
  );
};
  
// ========================================

ReactDOM.render(<Board />,document.getElementById("root"));

// console.log(`adding state ${JSON.stringify(state)}`)
// status = `Player ${nextPlayer}`;
