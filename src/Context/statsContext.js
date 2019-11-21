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
      statsData: {
        solo: { kd: [] }
      },
      comparisonData: {
        kd: { winners: [] },
        wins: { winners: [] },
        kills: { winners: [] },
        top10s: { winners: [] },
        longestKill: { winners: [] },
        headshotKills: { winners: [] }
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

    // Comparison binds

    this.winners = this.winners.bind(this);
  }

  // Handle Change name
  handleChangeName(event) {
    console.log(event.target.value);
    this.setState({ playerName: event.target.value });
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
    let newView = [...this.state.playersViewType];
    newView.splice(id, 1);
    this.setState({ playersViewType: newView });
    // splice player View from playerGameType array
    let newContent = this.state.playersGameType;
    newContent.splice(id, 1);
    this.setState({ playersGameType: newContent });
    this.setState({ isLoading: false });
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
      await callPlayer(this.state.playerName)
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
            console.log(this.state.comparisonData);
            this.statsData();
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

  winners(array) {
    const result = [];
    if (array.length === 1) {
      return 0;
    } else {
      const indexOfMaxValue = array.reduce(
        (indexMax, x, i, arr) => (x > arr[indexMax] ? i : indexMax),
        0
      );

      const maxValue = array[indexOfMaxValue];
      //console.log('MaxValue: ' + maxValue);
      array.map((item, index) => {
        //  console.log(maxValue);
        if (item === Number(maxValue)) {
          /* result.push(index); */
          console.log('winner : ' + index);
          return index;
        }
        console.log(result);
      });
    }
  }

  statsData() {
    const winners = array => {
      const result = [];
      if (array.length === 1) {
        return 0;
      } else {
        const indexOfMaxValue = array.reduce(
          (indexMax, x, i, arr) => (x > arr[indexMax] ? i : indexMax),
          0
        );

        const maxValue = array[indexOfMaxValue];
        //console.log('MaxValue: ' + maxValue);
        array.map((item, index) => {
          //  console.log(maxValue);
          if (item === Number(maxValue)) {
            /* result.push(index); */
            console.log('winner : ' + index);
            return index;
          }
          console.log(result);
        });
      }
    };

    // K/D
    const kd = this.state.playersArray.map(item =>
      parseFloat(
        item.currentSeason.data.attributes.gameModeStats['solo-fpp'].kills /
          item.currentSeason.data.attributes.gameModeStats['solo-fpp'].losses
      ).toFixed(2)
    );
    // Wins
    const wins = this.state.playersArray.map(
      item => item.currentSeason.data.attributes.gameModeStats['solo-fpp'].wins
    );
    // Kills
    const kills = this.state.playersArray.map(
      item => item.currentSeason.data.attributes.gameModeStats['solo-fpp'].kills
    );
    // Top 10's
    const top10s = this.state.playersArray.map(
      item =>
        item.currentSeason.data.attributes.gameModeStats['solo-fpp'].top10s
    );
    // Longest Kill
    const longestKill = this.state.playersArray.map(item =>
      item.currentSeason.data.attributes.gameModeStats[
        'solo-fpp'
      ].longestKill.toFixed(0)
    );
    // Kills
    const headshotKills = this.state.playersArray.map(
      item =>
        item.currentSeason.data.attributes.gameModeStats['solo-fpp']
          .headshotKills
    );

    console.log(kd);
    console.log(wins);
    console.log(kills);
    console.log(top10s);
    console.log(longestKill);
    console.log(headshotKills);

    const comparisonCopy = this.state.comparisonData;

    const newKd = winners(kd);
    const newWins = winners(wins);
    const newKills = winners(kills);
    const newTop10s = winners(top10s);
    const LongestKill = winners(longestKill);
    const newHeadshotKills = winners(headshotKills);

    console.log(comparisonCopy);

    this.setState({
      comparisonData: {
        kd: { winners: [] },
        wins: { winners: [] },
        kills: { winners: [] },
        top10s: { winners: [] },
        longestKill: { winners: [] },
        headshotKills: { winners: [] }
      }
    });

    console.log(this.state.comparisonData);
  }

  render() {
    return (
      <StatsContext.Provider
        value={{
          ...this.state,
          buttonDisabled: this.buttonDisabled,
          handleChangeName: this.handleChangeName,
          handlePlayerDelete: this.handlePlayerDelete,
          handleChangePlayersViewType: this.handleChangePlayersViewType,
          handleChangePlayersGameType: this.handleChangePlayersGameType,
          handlePlayerSubmit: this.handlePlayerSubmit
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
