import React from 'react';
import './index.css';
import Game from './Game';
import Menu from './Menu';

export default function App() {

  const [game, setGame] = React.useState(false);
  const [selected, setSelected] = React.useState('new-game');
  const [menu, setMenu] = React.useState(false);
  const [over, setOver] = React.useState(false);

  const startGame = () => {
    setGame(true);
  }

  const endGame = () => {
    setOver(true);
    console.log('over', over)
  }

  const restartGame = () => {
    setGame(false);
    setMenu(false);
    setOver(false);
    setSelected('new-game');
  }

  const toggleMenu = () => {
    setMenu(prev => !prev);
  }

  const handleKeyPress = (e) => {
    const key = e.key || e.target.id;
    switch (key) {
      case 'space':
      case ' ':
      case 'Spacebar':
        console.log(game, over, menu, selected)
        if(!game && !menu && !over) {
          selected === 'new-game' ? startGame() : toggleMenu();
        } else if(over) {
          restartGame();
        }
        break;
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='nokia'>
      {game && <Game endGame={endGame} restartGame={restartGame}/>}
      {/*menu && <Menu />*/}
      {!game && !menu && 
        <>
          <div className='screen'>
             <div className='start-menu'>
                <div className='snake-game-text'> S N A K E </div>
                <div className={selected === 'new-game' ? 'new-game-text-selected' : 'new-game-text'}> New Game </div>
                {<div className={selected === 'settings' ? 'settings-text-selected' : 'settings-text'}> Settings </div>}
              </div>
          </div>
          <button id='space' className='space' onClick={handleKeyPress}></button>
          <button className='upar' onClick={() => (setSelected(prev => 'new-game'))}></button>
          <button className='neeche' onClick={() => (setSelected(prev => 'settings'))}></button>
        </>
      }
    </div>
  )
}

