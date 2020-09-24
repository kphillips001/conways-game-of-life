import React from 'react';
import '../App.css'

const Rules = () => {
    return (
        <div className="rulesContainer">
            <h2>Rules</h2>
            <h4>The Game of Life is a cellular automaton where each cell in a typically two-dimensional grid can have two different states, "alive" or "dead". Each cell's behavior is based on it's eight surrounding neighbors, and each generation of the grid is a pure function of the previous grid state.</h4>
            <p>For each generation, the grid transitions based on the following rules:</p>
            <ul>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ul>
        </div>
    )
}

export default Rules;