import Gameboard from './components/Gameboard'

import './App.css'

function App() {
 

  return (
    <>
      <div className='title'>Ella's Memory Game</div>
      <div className='rules'>Rules: flip the cards and make a match...duh.</div>     
      <Gameboard />
    </>
  )
}

export default App
