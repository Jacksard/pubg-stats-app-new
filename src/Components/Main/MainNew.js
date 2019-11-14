import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import './MainNew.css';
import { callPlayer } from '../../api/axioscall';
import Button from '@material-ui/core/Button';

const MainNew = () => {
  const [playerName, setPlayerName] = useState('');
  const [playersArray, setPlayersArray] = useState([]);
  const [playersView, setPlayerView] = useState([]);
  const [playerGameType, setPlayerGameType] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    msg: ''
  });

  /* const handleNameButtons = (name, e) => {
    console.log(name);
    setPlayerName(name);
    handlePlayerSubmit(e);
  }; */

  const handleChange = event => {
    setPlayerName(event.target.value);
  };

  const handlePlayerDelete = id => {
    setLoading(true);
    console.log(id);
    // splice player from playersArray
    const joined = [...playersArray];
    joined.splice(id, 1);
    setPlayersArray(joined);
    // splice player View from playersView arary
    const newView = [...playersView];
    newView.splice(id, 1);
    setPlayerView({ newView });
    // splice player View from playerGameType array
    const newContent = [...playerGameType];
    newContent.splice(id, 1);
    setPlayerGameType({ newContent });

    setLoading(false);
    console.log(playersArray);
  };

  const handleChangeView = (type, i) => {
    const newView = playersView;
    newView[i] = type;
    setPlayerView(newView);
  };

  const handleChangeContent = (type, i) => {
    //console.log(type);
    //console.log(i);
    const newContent = playerGameType;
    newContent[i] = type;
    setPlayerGameType(newContent);
    //console.log(this.state.playerGameType);
  };

  const buttonDisabled = () => {
    if (!loading) {
      return false;
    } else {
      return true;
    }
  };

  const handlePlayerSubmit = event => {
    setLoading(true);
    event.preventDefault();

    // check if player name exists in players array before callPlayer, to avoid redundant API call
    let userExist = playersArray.find(item => item.name === playerName);

    if (userExist === undefined) {
      callPlayer(playerName)
        .then(res => {
          // Build Players Object and push it into PlayersArray.
          if (res === undefined) {
            setError({ isError: true, msg: 'Player not found!' });

            setLoading(false);
          } else {
            var joined = playersArray.concat(res);
            setPlayersArray(joined);
            //console.log(this.state.playersArray);
            setPlayerGameType(playerGameType.concat('solo'));
            setPlayerView(playersView.concat('fpp'));
            // Comparison data

            setLoading(false);
            setPlayerName('');
            //console.log(this.state.playerGameType);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('User added');
      setLoading(false);
      console.log(playersArray);
      return null;
    }
  };

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
        <h2>{playerName}</h2>
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
