import React, { useContext, useEffect } from 'react';
import Solo from '../GameType/solo';
import Duo from '../GameType/duo';
import Squad from '../GameType/squad';
import './CurrentGameType.css';
import { StatsContext } from '../../Context/statsContext';

const CurrentGameType = props => {
  /* this.indexHighValue = this.indexHighValue.bind(this);
    this.winners = this.winners.bind(this);
    this.indexHighValue = this.indexHighValue.bind(this); */

  const {
    playersArray,
    playersGameType,
    playersViewType,
    comparisonData
  } = useContext(StatsContext);

  return (
    <div>
      <p>test : {props.i}</p>

      {/*  {playersArray[props.i]}
      {playersGameType[props.i]} */}
    </div>
  );
};
export default CurrentGameType;
