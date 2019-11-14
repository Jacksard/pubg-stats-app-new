import React, { Component, setState, createContext } from 'react';

export const StatsContext = createContext();

class StatsContextProvider extends Component {
  state = {
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

  render() {
    return (
      <StatsContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </StatsContext.Provider>
    );
  }
}

export default StatsContextProvider;
