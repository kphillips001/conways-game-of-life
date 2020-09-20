import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';

const numRows = 30;
const numCols = 30;

function Game() {
  const [grid, setGrid] = useState(() => {
    const rows = []; 
    for (let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), () => 0 ))
    }

    return rows;
  });

  const [running, setRunning] = useState(false);

  //running value changes but function does not - store in const
  const runningRef = useRef(running);
  runningRef.current = running

  //run simulation -> don't want to change on every render so use useCallback hook
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    //simulate
    setTimeout(runSimulation, 1000);
  }, [])
  
  return (
    <>
      <button
        onClick={() => {
          setRunning(!running)
        }}
      > 
        {running ? 'stop' : 'running'} 
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div 
            key={`${i}-${k}`}
            onClick={() => {
              //set intial state for grid - if alive - set to dead
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
              })
              setGrid(newGrid);
            }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "black" : undefined,
                border: 'solid 1px black'
              }}
          />
        ))
      )}
      </div>
    </>
  )
  
}

export default Game;