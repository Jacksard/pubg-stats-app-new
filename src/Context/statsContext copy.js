import React, { createContext, useState, useEffect } from 'react';
import { callPlayer } from '../api/axioscall';
export const StatsContext = createContext();

export const StatsContextProvider = props => {
  const [playerName, setPlayerName] = useState('');
  const [playersArray, setPlayersArray] = useState([]);
  const [playersView, setPlayersView] = useState([]);
  const [playerGameType, setPlayerGameType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: 'error msg' });

  const [comparisonData, setComparisonData] = useState({
    kd: [],
    wins: [],
    kills: [],
    top10s: [],
    longestKill: [],
    headshotKills: []
  });

  // Handle Change name
  const handleChange = event => {
    setPlayerName(event.target.value);
  };

  // Handle Change view
  const handleChangePlayersView = (type, i) => {
    console.log(type);
    console.log(i);
    let newView = playersView;
    if (newView[i] === type) {
      return null;
    } else {
      newView[i] = type;
    }
    setPlayersView(newView);
    console.log(newView);
  };
  // Handle Game Type
  const handleGameType = (type, i) => {
    console.log(type);
    console.log(i);
    let newPlayersGameType = playerGameType;
    newPlayersGameType[i] = type;
    setPlayerGameType(newPlayersGameType);

    console.log(playerGameType);
  };

  // handle Change PlayerGameType
  const handleChangeGameType = (type, i) => {
    let newContent = playerGameType;
    newContent[i] = type;
    setPlayerGameType(newContent);
    console.log(newContent);
  };

  // Handle view game type:
  /* const handleViewType = (type, i) => {
    console.log(type);
    console.log(i);
    if (type === 'tpp') {
      setView('tpp');
    }
    if (type === 'fpp') {
      setView('fpp');
    }
    if (playersView[i] !== type) {
      //this.props.changeView(type, i);
      handleChangePlayersView(type, i);
    }
  }; */

  // Handle Player delete
  const handlePlayerDelete = id => {
    setIsLoading(true);
    console.log(id);
    // splice player from playersArray
    let joined = playersArray;
    joined.splice(id, 1);
    setPlayersArray(joined);
    // splice player View from playersView arary
    let newView = [...playersView];
    newView.splice(id, 1);
    setPlayersView(newView);
    // splice player View from playerGameType array
    let newContent = [...playerGameType];
    newContent.splice(id, 1);
    setPlayerGameType(newContent);
    setIsLoading(false);
    console.log(playersArray);
  };

  // Disable button while loading
  const buttonDisabled = () => {
    if (!isLoading) {
      return false;
    } else {
      return true;
    }
  };

  // Handle player submit
  const handlePlayerSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    console.log(playersArray);
    // check if player name exists in players array before callPlayer, to avoid redundant API call
    let userExist = playersArray.find(item => item.name === playerName);

    console.log('user:' + userExist);

    if (userExist === undefined) {
      callPlayer(playerName)
        .then(res => {
          // Build Players Object and push it into PlayersArray.
          if (res === undefined) {
            setError({ isError: true, msg: 'Player not found!' });

            setIsLoading(false);
          } else {
            var joined = playersArray.concat(res);
            setPlayersArray(joined);
            //console.log(this.state.playersArray);
            setPlayerGameType(playerGameType.concat('solo'));
            setPlayersView(playersView.concat('fpp'));
            // Comparison data

            setPlayerName('');
            setIsLoading(false);
            //console.log(this.state.playerGameType);
            console.log(playersArray);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('User added');
      setIsLoading(false);
      console.log(playersArray);
      return null;
    }
  };

  // Use useEffect to struct the data that represents the conditional styling
  useEffect(() => {
    console.log('Use Effect ran');
  }, [playersView, playerGameType]);

  return (
    <StatsContext.Provider
      value={{
        playerName,
        playersArray,
        playersView,
        setPlayersView,
        playerGameType,
        setPlayerGameType,
        isLoading,
        error,
        comparisonData,
        handleChange,
        handlePlayerDelete,
        handleChangePlayersView,
        handleChangeGameType,
        buttonDisabled,
        handlePlayerSubmit,
        handleGameType
      }}
    >
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsContextProvider;

/* value={{
  playerName,
  playersArray,
  playersView,
  setPlayersView,
  playerGameType,
  setPlayerGameType,
  isLoading,
  error,
  comparisonData,
  handleChange,
  handlePlayerDelete,
  handleChangePlayersView,
  handleChangeGameType,
  buttonDisabled,
  handlePlayerSubmit,
  handleGameType
}} */
