import React from "react";
import TextField from "@material-ui/core/TextField";
import "../index.css";

const Inputs = ({
  size,
  setSize,
  running,
  setGrid,
  generateEmptyGrid,
  generations,
}) => {
  const handleRowChange = (e) => {
    let newSize = size;
    if (!running) {
      if (!parseInt(e.target.value)) {
        newSize[1] = 0;
      } else if (e.target.value < 60) {
        newSize[1] = e.target.value;
      } else {
        newSize[1] = 25;
      }

      newSize[1] = parseInt(newSize[1]);
      setSize(newSize);
    }
    setGrid(generateEmptyGrid(newSize[0], newSize[1]));
  };

  const handleColumnChange = (e) => {
    let newSize = size;
    if (!running) {
      if (!parseInt(e.target.value)) {
        newSize[0] = 0;
      } else if (e.target.value < 60) {
        newSize[0] = e.target.value;
      } else {
        newSize[0] = 25;
      }
      newSize[0] = parseInt(newSize[0]);
      setSize(newSize);
    }
    setGrid(generateEmptyGrid(newSize[0], newSize[1]));
  };

  return (
    <div className="inputs">
      <form>
        <TextField
          id="row"
          label="Row"
          variant="outlined"
          value={size[1]}
          onChange={handleRowChange}
        />
        <p>X</p>
        <div className="column">
          <TextField
            id="column"
            label="Column"
            variant="outlined"
            value={size[0]}
            onChange={handleColumnChange}
          />
        </div>
      </form>
      <h2>Generations: {generations}</h2>
    </div>
  );
};

export default Inputs;