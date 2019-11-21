import React, { useContext, useEffect } from 'react';
import Solo from '../GameType/solo';
import Duo from '../GameType/duo';
import Squad from '../GameType/squad';
import './CurrentGameType.css';
import { StatsContext } from '../../Context/statsContext';

// learn Mutations and apply to change comparisonData from CurrentGameTypeNew.

const CurrentGameType = props => {
  const {
    playersArray,
    playersGameType,
    playersViewType,
    comparisonData
  } = useContext(StatsContext);

  const handleGameType = type => {
    switch (type) {
      case 'solo':
        return (
          <Solo
            data={this.props.data}
            index={this.props.index}
            view={this.props.view}
            comparisonData={this.state.comparisonData}
          />
        );
      case 'duo':
        return (
          <Duo
            data={this.props.data}
            index={this.props.index}
            view={this.props.view}
            comparisonData={this.state.comparisonData}
          />
        );
      case 'squad':
        return (
          <Squad
            data={this.props.data}
            index={this.props.index}
            view={this.props.view}
            comparisonData={this.state.comparisonData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='currentGameType'>
      <p>{props.index}</p>
      {handleGameType(playersArray)}
    </div>
  );
};
export default CurrentGameType;
