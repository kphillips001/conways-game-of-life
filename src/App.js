import React from 'react';
import Header from './components/Header';
import Game from './components/Game';
import Rules from './components/Rules';
import About from './components/About'

const App = ()  => {
  return (
    <div className='App'>
      <Header />
      <Game />
      <Rules />
      <About />
    </div>
  )
}

export default App; 