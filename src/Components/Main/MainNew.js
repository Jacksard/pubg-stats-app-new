import React, { useEffect, useContext } from 'react';
import CardsNew from '../Cards/CardsNew';
import Card from '../Cards/Cards_Original';
import './MainNew.css';
import { callPlayer } from '../../api/axioscall';
import Button from '@material-ui/core/Button';
import { StatsContext } from '../../Context/statsContext';

const MainNew = () => {
  const {
    handlePlayerSubmit,
    handleChangeName,
    playerName,
    buttonDisabled,
    error
  } = useContext(StatsContext);

  useEffect(() => {
    /* console.log(error.isError); */
  });

  return (
    <div className='mainContainer'>
      <form onSubmit={handlePlayerSubmit}>
        <br />
        <div className='textField-mu'>
          <p className='playerName'>PLAYER NAME</p>
          <input
            label='Name'
            className='inputField'
            onChange={handleChangeName}
            value={playerName}
          />
          <br />
          <Button type='submit' value='Submit' className='submitButton'>
            Submit
          </Button>
        </div>
        <button
          onClick={handleChangeName}
          value='J4cksard'
          disabled={buttonDisabled()}
        >
          J4cksard
        </button>
        <button
          onClick={handleChangeName}
          value='Twisted_OO'
          disabled={buttonDisabled()}
        >
          Twisted_OO
        </button>
        <button
          onClick={handleChangeName}
          value='chikenkk'
          disabled={buttonDisabled()}
        >
          chikenkk
        </button>

        {error.isError === true ? <h4>{error.msg}</h4> : null}
      </form>
      <div className='cardContainer'>
        <ul>
          {/* <Card
            view={playersViewType}
            content={playersGameType}
            changeContent={handleChangePlayersGameType}
            changeView={handleChangePlayersViewType}
            player={playersArray}
            delete={handlePlayerDelete}
            isLoading={isLoading}
          /> */}
          <CardsNew />
        </ul>
      </div>
    </div>
  );
};

export default MainNew;
