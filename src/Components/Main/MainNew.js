import React, { useEffect, useContext } from 'react';
import CardsNew from '../Cards/CardsNew';
import './MainNew.css';
import { callPlayer } from '../../api/axioscall';
import Button from '@material-ui/core/Button';
import { StatsContext } from '../../Context/statsContext';

const MainNew = () => {
  const {
    handlePlayerSubmit,
    handleChange,
    playerName,
    buttonDisabled,
    error,

    playersArray,
    playerGameType,
    playersView,
    handlePlayerDelete,
    handleChangePlayersView,
    handleChangeContent
  } = useContext(StatsContext);

  useEffect(() => {
    console.log(playersArray);
  }, [playersArray]);

  return (
    <div className='mainContainer'>
      <form onSubmit={handlePlayerSubmit}>
        <br />
        <div className='textField-mu'>
          <p className='playerName'>PLAYER NAME</p>
          <input
            label='Name'
            className='inputField'
            onChange={handleChange}
            value={playerName}
          />
          <br />
          <Button type='submit' value='Submit' className='submitButton'>
            Submit
          </Button>
        </div>
        <button
          onClick={handleChange}
          value='J4cksard'
          disabled={buttonDisabled()}
        >
          J4cksard
        </button>
        <button
          onClick={handleChange}
          value='Twisted_OO'
          disabled={buttonDisabled()}
        >
          Twisted_OO
        </button>

        {error.isError === true ? <h4>{error.msg}</h4> : null}
      </form>
      <div className='cardContainer'>
        <ul>
          <CardsNew />
        </ul>
      </div>
    </div>
  );
};

export default MainNew;
