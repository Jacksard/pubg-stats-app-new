import React, { Component, useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';

import Loader from 'react-loader-spinner';
import './Cards.css';
import CurrentGameType from '../CurrentGameType/CurrentGameType';
import CardHeader from './CardHeader/CardHeader';
import { StatsContext } from '../../Context/statsContext';

const SimpleCard = props => {
  const {
    isLoading,
    playersArray,
    playersView,
    playerGameType,
    handleChangePlayersView,
    handleGameType,
    handlePlayerDelete
  } = useContext(StatsContext);

  const [gameType, setGameType] = useState('solo');
  const [view, setView] = useState('fpp');

  const handleViewType = (type, i) => {
    console.log(type);
    console.log(i);
    if (type === 'tpp') {
      setView('tpp');
    }
    if (type === 'fpp') {
      setView('fpp');
    }
    if (playersView[i] !== type) {
      handleChangePlayersView(type, i);
    }
  };

  const rank = (type, view) => {
    if (view === 'tpp') {
      return type;
    } else {
      return type + '-' + view;
    }
  };

  return (
    <React.Fragment>
      <Grid container direction='row' justify='center' alignItems='center'>
        {isLoading === false ? (
          playersArray.map((item, i) => {
            return (
              <li key={shortid.generate()}>
                <Card className='card'>
                  <Grid container spacing={0}>
                    <Grid item xs={12} className='headLeft'>
                      <CardHeader item={item} delete={handlePlayerDelete} />
                    </Grid>
                  </Grid>
                  <hr />
                  {/* ------ View Mode menu ------ */}
                  <Grid container spacing={2} className='gameTypeContainer'>
                    <Grid
                      item
                      xs={6}
                      className='gameType'
                      onClick={() => handleViewType('fpp', i)}
                    >
                      <div
                        className={
                          view[i] === 'fpp' ? 'selectedTab' : 'styleTab'
                        }
                      >
                        FPP
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className='gameType'
                      onClick={() => handleViewType('tpp', i)}
                    >
                      <div
                        className={
                          view[i] === 'tpp' ? 'selectedTab' : 'styleTab'
                        }
                      >
                        TPP
                      </div>
                    </Grid>
                  </Grid>

                  {/* ------ Game Type menu ------ */}
                  <Grid container spacing={1} className='gameTypeContainer'>
                    <Grid
                      item
                      xs={4}
                      className='gameType'
                      onClick={() => handleGameType('solo', i)}
                    >
                      <div
                        className={
                          playerGameType[i] === 'solo'
                            ? 'selectedTab'
                            : 'styleTab'
                        }
                      >
                        SOLO
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className='gameType'
                      onClick={() => handleGameType('duo', i)}
                    >
                      <div
                        className={
                          playerGameType[i] === 'duo'
                            ? 'selectedTab'
                            : 'styleTab'
                        }
                      >
                        DUO
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className='gameType'
                      onClick={() => handleGameType('squad', i)}
                    >
                      <div
                        className={
                          playerGameType[i] === 'squad'
                            ? 'selectedTab'
                            : 'styleTab'
                        }
                      >
                        SQUAD
                      </div>
                    </Grid>
                  </Grid>

                  {/* <div className='fabDiv'>
                      <Fab
                        color='primary'
                        aria-label='add'
                        className='fab'
                        size='small'
                      >
                        <AddIcon className='addIcon' />
                      </Fab>
                    </div> */}
                </Card>
              </li>
            );
          })
        ) : (
          <Loader type='Puff' color='#00BFFF' height={100} width={100} />
        )}
      </Grid>
    </React.Fragment>
  );
};

export default SimpleCard;