import React, { useEffect, useContext } from 'react';
import Cards from '../Cards/Cards';
import './MainNew.css';
import { callPlayer } from '../../api/axioscall';
import Button from '@material-ui/core/Button';
import { StatsContext } from '../../Context/statsContext';

const MainNew = () => {
  const {
    playerName,
    playersArray,
    playersView,
    playerGameType,
    loading,
    error,
    handleChange,
    handlePlayerDelete,
    handleChangeView,
    handleChangeContent,
    buttonDisabled,
    handlePlayerSubmit
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
          <Cards
            view={playersView}
            content={playerGameType}
            changeContent={handleChangeContent}
            changeView={handleChangeView}
            player={playersArray}
            delete={handlePlayerDelete}
            isLoading={loading}
          />
        </ul>
      </div>
    </div>
  );
};

export default MainNew;
