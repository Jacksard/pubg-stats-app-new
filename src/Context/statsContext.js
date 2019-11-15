import React, { createContext, useState } from 'react';
import { callPlayer } from '../api/axioscall';
export const StatsContext = createContext();

export const StatsContextProvider = props => {
  const [state, setState] = useState({
    playerName: '',
    playersArray: [],
    playersView: [],
    playerGameType: [],
    comparison: {
      kd: null,
      wins: null,
      kills: null,
      top10s: null,
      longestKill: null,
      HeadShotKills: null
    },
    loading: false,
    error: {
      isError: false,
      msg: ''
    }
  });

  const [playerName, setPlayerName] = useState('');
  const [playersArray, setPlayersArray] = useState([]);
  const [playersView, setPlayersView] = useState([]);
  const [playerGameType, setPlayerGameType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: true, msg: 'error msg' });

  const [comparisonData, setComparisonData] = useState({
    kd: { winners: [] },
    wins: { winners: [] },
    kills: { winners: [] },
    top10s: { winners: [] },
    longestKill: { winners: [] },
    headshotKills: { winners: [] }
  });

  // handle Change name
  const handleChange = event => {
    setPlayerName(event.target.value);
  };

  // handle Player delete
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
    setPlayersView(newView);
    // splice player View from playerGameType array
    const newContent = [...playerGameType];
    newContent.splice(id, 1);
    setPlayerGameType(newContent);

    setLoading(false);
    console.log(playersArray);
  };

  // handle Change view
  const handleChangeView = (type, i) => {
    const newView = playersView;
    newView[i] = type;
    setPlayersView(playersView(newView));
  };

  // handle Change content
  const handleChangeContent = (type, i) => {
    //console.log(type);
    //console.log(i);
    const newContent = state.playerGameType;
    newContent[i] = type;
    setPlayerGameType(newContent);
  };

  // disable button while loading
  const buttonDisabled = () => {
    if (!loading) {
      return false;
    } else {
      return true;
    }
  };

  // handle player submit
  const handlePlayerSubmit = event => {
    event.preventDefault();
    setLoading(true);
    console.log(playersArray);
    // check if player name exists in players array before callPlayer, to avoid redundant API call
    let userExist = playersArray.find(item => item.name === state.playerName);

    console.log('user:' + userExist);

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
            setPlayersView(playersView.concat('fpp'));
            // Comparison data

            setLoading(false);
            setPlayerName('');
            //console.log(this.state.playerGameType);
            console.log(playersArray);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('User added');
      setState({ loading: false });
      console.log(state.playersArray);
      return null;
    }
  };

  return (
    <StatsContext.Provider
      value={{
        playerName,
        playersArray,
        playersView,
        playerGameType,
        loading,
        error,
        comparisonData,
        handleChange,
        handlePlayerDelete,
        handleChangeView,
        handleChangeContent,
        buttonDisabled,
        handlePlayerSubmit
      }}
    >
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsContextProvider;
