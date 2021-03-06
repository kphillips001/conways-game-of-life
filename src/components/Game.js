import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const Game = () => {
   
  //represents location of the neighbors 
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

  const numRows = 30;
  const numCols= 30;
  const [gen, setGen] = useState(0);
  const [run, setRun] = useState(false);
  const emptyGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    setGen(0)
    return rows;
    };

  const [speed, setSpeed] = useState(500);
  const [grid, setGrid] = useState(() => {
   return emptyGrid()
  });

  //running value changes but function does not - store in const
  const runRef = useRef();
  runRef.current = run

  //run simulation -> don't want to change on every render so use useCallback hook
  const runGame = useCallback(() => {
    if (!runRef.current) {
      return;
    }
  
    setGrid(g => {
      //iterates through the entire grid 
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
      
            //computes the neighbors  
            let neighbors = 0;
            operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;

            // checking the bounds of the grid
            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
             //if have a live cell => add ones to the neighbors    
             neighbors += g[newI][newK]
            }
          })
          // determines what happens to the cells
          if (neighbors < 2 || neighbors > 3) {
            gridCopy[i][k] = 0;
          } else if (g[i][k] === 0 && neighbors === 3) {
             //mutates grid copy, produce produces new grid & updates setGrid  
             gridCopy[i][k] = 1;
          }
        }
      }
      })
    })
    setGen(prevState => prevState + 1)
    setTimeout(runGame, speed);
  }, [{speed}]);

  return (
    <>
      <div className="gridContainer">
         <div className="gameplay">
           <h3>Generation: {gen}</h3>
            <h3>Speed:{speed === 500 ? "0.5s" : "1s"}</h3>
         </div>
          <div
            className="gameGrid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, k) => (
                <div
                  className="game"
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[i][k] ? "red" : undefined,
                    border: "1px solid black",
                  }}
                />
              ))
            )}
          </div>
          <div className="btnContainer">
            <button
              className="btn"
              onClick={() => {
                setRun(!run);
                // set runRef current to true in case the state does not update in time
                if (!run) {
                  runRef.current = true;
                  runGame();
                }
              }}
            >
              {run ? "STOP" : "START"}
            </button>
            <button
              className="btn"
              onClick={() => {
                setGrid(emptyGrid());
              }}
            >
              CLEAR
            </button>
            <button
              className="btn"
              onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () =>
                      Math.random() > 0.7 ? 1 : 0
                    )
                  );
                }
                setGrid(rows);
              }}
            >
              RANDOM
            </button>
            {!runRef.current ? (
              <button
                className="btn"
                onClick={() => {
                  if (speed === 500) {
                    setSpeed(1000);
                  } else {
                    setSpeed(500);
                  }
                }}
              >
                {speed === 500 ? "SLOWER" : "FASTER"}
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </>
    );
}

export default Game;