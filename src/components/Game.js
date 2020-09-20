import React, {useState} from 'react';

const numRows = 25;
const numCols = 25;

function Game() {
  const [grid, setGrid] = useState(() => {
    const rows = []; 
    for (let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), () => 0 ))
    }

    return rows;
  });

  console.log(grid);
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}>
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div 
          key={`${i}-${k}`}
            style={{
              width: 20,
              height: 20,
              backgroundColr: grid[i][k] ? "black" : undefined,
              border: 'solid 1px black'
            }}
          />
        ))
      )}
    </div>
  )
  
}

export default Game;