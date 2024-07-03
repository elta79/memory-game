import { useEffect, useState } from "react"
import CardItem from "./CardItem"
import { ImageList } from "../helpers/ImageList"

function Gameboard(){
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ card1, setCard1 ] = useState(null)
  const [ card2, setCard2 ] = useState(null)
  const [ disabled, setDisabled ]= useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...ImageList, ...ImageList]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))

    setCard1(null)
    setCard2(null)
    setTurns(0)
    setCards(shuffledCards)
    console.log(cards)
  }

  const handleFlip = (card) => {
    card1 ? setCard2(card) : setCard1(card)    
  }

  useEffect(() =>{
    
    if(card1 && card2){
      setDisabled(true)
      if(card1.name === card2.name){
        //update card state to matched
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.name === card1.name){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })       
        resetTurn()
      }else{        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [card1, card2])
  
  //reset choices & increment turn
  const resetTurn = () => {
    setCard1(null)
    setCard2(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  //auto restart
  useEffect(() => {
    shuffleCards()
  }, []) 

  return(
    <>
      {/* <button onClick={shuffleCards}>Start</button> */}
      <div className="game-board">
        {cards.map((card) => (                  
          <CardItem 
            key={card.id}
            card={card} 
            flipCard={()=>handleFlip(card)}
            flipped={card === card1 || card === card2 || card.matched}
            disabled={disabled}
          />                
          ))}
      </div>
      <div className='turns'>Turns:  {turns}</div>
      
    </>
  )
}

export default Gameboard