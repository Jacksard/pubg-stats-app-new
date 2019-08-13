import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import shortid from 'shortid';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import { width } from '@material-ui/system';

const useStyles = makeStyles({
  card: {
    alignItems: 'stretch',
    minHeight: 'auto',
    minWidth: 250,
    maxWidth: 250,
    padding: 5
  },
  cardHead : {
    display : 'inline-block'
  },
  headControls: {
    backgroundColor: 'red'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  list: {
    flexGrow: 1
  }
});

const handleLifetime = props => {
  console.log('Lifetime');
};

// Extracts last 5 matches
const handleMatches = props => {
  const matches = props.player[0].relationships.matches.data.slice(0, 5);
  console.log(matches);
  return matches.map(id => {
    return <button key={shortid.generate()}>{id.id}</button>;
  });
};

const SimpleCard = props => {
  const classes = useStyles();
  //const matches = props.player.relationships.matches.data[0].id;

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.list}
      >
        {props.player.map(item => {
          return (
            <li key={shortid.generate()}>
              <Card className={classes.card}>
                <Container className={classes.cardHead}>

                <Grid item xs={8} >
                  <Paper className={classes.headControls}>{item.name}</Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>(+)</Paper>
                </Grid>
                </Container>
                {item.name}
                <br />
                <hr />
                <p>
                  <strong>Solo - FPP</strong>
                </p>
                <p>
                  Wins:
              {item.lifetime.attributes.gameModeStats["solo-fpp"].wins}
                </p>
                <p>
                  Kills:
              {item.lifetime.attributes.gameModeStats["solo-fpp"].kills}
                </p>
                <p>
                  Headshot kills:
              {item.lifetime.attributes.gameModeStats["solo-fpp"].headshotKills}
                </p>
                <p>
                  Longest Kill:
              {item.lifetime.attributes.gameModeStats["solo-fpp"].longestKill.toFixed(1)}m
                </p>

                {handleLifetime(props)}
              </Card>
            </li>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default SimpleCard;
