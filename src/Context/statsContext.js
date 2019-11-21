import React, { Component, createContext } from 'react';
import { callPlayer } from '../api/axioscall';
export const StatsContext = createContext();

class StatsContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playersArray: [],
      playersViewType: [],
      playersGameType: [],
      comparison: {
        kd: null,
        wins: null,
        kills: null,
        top10s: null,
        longestKill: null,
        HeadShotKills: null
      },
      isLoading: false,
      error: {
        isError: false,
        msg: ''
      },
      comparisonData: {
        kd: [],
        wins: [],
        kills: [],
        top10s: [],
        longestKill: [],
        headshotKills: []
      }
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
    this.handlePlayerDelete = this.handlePlayerDelete.bind(this);
    /* this.handleNameButtons = this.handleNameButtons.bind(this); */
    this.handleChangePlayersViewType = this.handleChangePlayersViewType.bind(
      this
    );
    this.handleChangePlayersGameType = this.handleChangePlayersGameType.bind(
      this
    );
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }

  // Handle Change name
  handleChangeName(event) {
    console.log(event.target.value);
    this.setState({ playerName: event.target.value });
    this.handlePlayerSubmit(event);
  }

  // Handle Change view
  handleChangePlayersViewType(type, i) {
    console.log(type);
    console.log(i);
    let newView = this.state.playersViewType;
    if (newView[i] === type) {
      return null;
    } else {
      newView[i] = type;
    }
    this.setState({ playersViewType: newView });
    console.log(newView);
  }
  // Handle Game Type
  handleChangePlayersGameType(type, i) {
    console.log(type);
    console.log(i);
    let newPlayersGameType = this.state.playersGameType;
    newPlayersGameType[i] = type;
    this.setState({ playersGameType: newPlayersGameType });

    console.log(this.state.playersGameType);
  }

  // --------->> Continue here. 03:16PM

  // Handle Player delete
  handlePlayerDelete(id) {
    this.setState({ isLoading: true });
    console.log(id);
    // splice player from playersArray
    let newPlayersArray = this.state.playersArray;
    newPlayersArray.splice(id, 1);
    this.setState({ playersArray: newPlayersArray });
    // splice player View from playersView arary
    let newView = [...this.state.playersView];
    newView.splice(id, 1);
    this.setState({ playersViewType: newView });
    // splice player View from playerGameType array
    let newContent = [...this.state.playersGameType];
    newContent.splice(id, 1);
    this.setState({ playersGameType: newContent });
    this.setState({ IsLoading: false });
    console.log(this.state.playersArray);
  }

  // Disable button while loading
  buttonDisabled() {
    if (!this.state.isLoading) {
      return false;
    } else {
      return true;
    }
  }

  // Handle player submit
  async handlePlayerSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    console.log(this.state.playersArray);
    // check if player name exists in players array before callPlayer, to avoid redundant API call
    let userExist = this.state.playersArray.find(
      item => item.name === this.state.playerName
    );

    console.log('user:' + userExist);

    if (userExist === undefined) {
      await callPlayer(event.target.value)
        .then(res => {
          // Build Players Object and push it into PlayersArray.
          if (res === undefined) {
            this.setState({ error: { isError: true } });
            this.setState({ error: { msg: 'Player not found!' } });
            this.setState({ isLoading: false });
          } else {
            let newPlayersArray = this.state.playersArray.concat(res);
            this.setState({ playersArray: newPlayersArray });
            //console.log(this.state.playersArray);
            this.setState({
              playersGameType: this.state.playersGameType.concat('solo')
            });
            this.setState({
              playersViewType: this.state.playersViewType.concat('fpp')
            });
            // Comparison data

            this.setState({ comparison: null });

            this.setState({ isLoading: false });
            this.setState({ playerName: '' });
            //console.log(this.state.playerGameType);
            console.log(this.state.playersArray);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('User added');
      this.setState({ isLoading: false });
      return null;
    }
  }

  render() {
    return (
      <StatsContext.Provider
        value={{
          ...this.state,
          buttonDisabled: this.buttonDisabled,
          handleChangeName: this.handleChangeName,
          handlePlayerDelete: this.handlePlayerDelete
        }}
      >
        {this.props.children}
      </StatsContext.Provider>
    );
  }
}

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

// Use useEffect to struct the data that represents the conditional styling
/* useEffect(() => {
    console.log('Use Effect ran');
  }, [playersView, playerGameType]); */

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
