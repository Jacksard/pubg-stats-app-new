import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';

import Loader from 'react-loader-spinner';
import './Cards.css';
import CurrentGameType from '../CurrentGameType/CurrentGameTypeNew';
import CardHeader from './CardHeader/CardHeader';
import { StatsContext } from '../../Context/statsContext';

const SimpleCard = props => {
  const {
    isLoading,
    playersArray,
    playersViewType,
    setPlayersView,
    playersGameType,
    setPlayerGameType,
    handleChangePlayersViewType,
    handleGameType,
    handlePlayerDelete,
    handleChangePlayersGameType
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

  useEffect(() => {});

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
                      onClick={() => handleChangePlayersViewType('fpp', i)}
                    >
                      <div
                        className={
                          playersViewType[i] === 'fpp'
                            ? 'selectedTab'
                            : 'styleTab'
                        }
                      >
                        FPP
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className='gameType'
                      onClick={() => handleChangePlayersViewType('tpp', i)}
                    >
                      <div
                        className={
                          playersViewType[i] === 'tpp'
                            ? 'selectedTab'
                            : 'styleTab'
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
                      onClick={() => handleChangePlayersGameType('solo', i)}
                    >
                      <div
                        className={
                          playersGameType[i] === 'solo' || undefined
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
                      onClick={() => handleChangePlayersGameType('duo', i)}
                    >
                      <div
                        className={
                          playersGameType[i] === 'duo'
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
                      onClick={() => handleChangePlayersGameType('squad', i)}
                    >
                      <div
                        className={
                          playersGameType[i] === 'squad'
                            ? 'selectedTab'
                            : 'styleTab'
                        }
                      >
                        SQUAD
                      </div>
                    </Grid>
                  </Grid>
                  <CurrentGameType i={i} />
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
