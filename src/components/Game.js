import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import operations from './Operations';

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
    
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i  = 0; i < numRows; i++){
          for (let j = 0; j < numCols; j++ ){
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              
              // checking the bounds of the grid to see if we went below/above
              if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){
                //if have a live cell => add ones to the neighbors 
                neighbors += g[newI][newJ]
              }
            })
            // determines what happens to the cells 
            if(neighbors < 2 || neighbors > 3){
              gridCopy[i][j] = 0;
            } else if(g[i][j] === 0 && neighbors === 3){
              gridCopy[i][j] = 1; 
            }
         }
        }
      })
    })

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
          rows.map((col, j) => (
            <div 
            key={`${i}-${j}`}
            onClick={() => {
              //set intial state for grid - if alive - set to dead
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
              })
              setGrid(newGrid);
            }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
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