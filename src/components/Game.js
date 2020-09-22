import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import operations from './Operations';

const numRows = 30;
const numCols = 30;

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const Game = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
    
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
      //iterates through the entire grid 
      return produce(g, gridCopy => {
        for (let i  = 0; i < numRows; i++){
          for (let j = 0; j < numCols; j++ ){
            
            //computers the number of neighbors 
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              
              // checking to see if we stay in bounds. 
              if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){
                //if have a live cell => add ones to the neighbors 
                neighbors += g[newI][newJ]
              }
            });
            // determines what happens to the cells(becomes 0, 1, or nothing)
            if(neighbors < 2 || neighbors > 3){
              gridCopy[i][j] = 0;
            } else if(g[i][j] === 0 && neighbors === 3){
              //mutates grid copy, produce produces new grid & updates setGrid
              gridCopy[i][j] = 1; 
            }
         }
        }
      })
    });

   setTimeout(runSimulation, 100);
  }, [])
  
  return (
    <>
      <button
        onClick={() => {
          setRunning(!running)
          if(!running){
            runningRef.current = true;
            runSimulation()
          }
        }}
      > 
        {running ? 'stop' : 'start'} 
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        Random
      </button>
      <button onClick={() => {
        setGrid(generateEmptyGrid());
        }} 
      >
        Clear
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }}
      >
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