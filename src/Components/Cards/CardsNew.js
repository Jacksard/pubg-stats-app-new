import React, { useState, useContext, useEffect } from 'react';
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
    setPlayersView,
    playerGameType,
    setPlayerGameType,
    handleChangePlayersView,
    handleGameType,
    handlePlayerDelete,
    handleChangeGameType
  } = useContext(StatsContext);

  const [gameType, setGameType] = useState(null);
  const [view, setView] = useState(null);

  const rank = (type, view) => {
    if (view === 'tpp') {
      return type;
    } else {
      return type + '-' + view;
    }
  };

  useEffect(() => {
    console.log('test');
    console.log(view);
    console.log(playersView);
    console.log(gameType);
    console.log(playerGameType);
    setView(playersView);
    setGameType(playerGameType);
  }, [playersView, playerGameType, playersArray]);

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
                      onClick={() => handleChangePlayersView('fpp', i)}
                    >
                      <div
                        className={
                          playersView[i] === 'fpp' ? 'selectedTab' : 'styleTab'
                        }
                      >
                        FPP
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className='gameType'
                      onClick={() => handleChangePlayersView('tpp', i)}
                    >
                      <div
                        className={
                          playersView[i] === 'tpp' ? 'selectedTab' : 'styleTab'
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
                      onClick={() => handleChangeGameType('solo', i)}
                    >
                      <div
                        className={
                          playerGameType[i] === 'solo' || undefined
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
                      onClick={() => handleChangeGameType('duo', i)}
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
                      onClick={() => handleChangeGameType('squad', i)}
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
