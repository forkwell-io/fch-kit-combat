import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: 375,
  },
  details: {
    alignItems: 'left',
  },
  content: {
    height: 140,
    width: 200,
    alignItems: 'left',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'left',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  textAlign: {
      marginTop:20,
  }
}));

export default function ChatHeader() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card square className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            I'm Covy
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className = {classes.textAlign}>
            Your virtual COVID-19 Assessment assistant
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png"
        title="Covid MediBot"
      />
    </Card>
  );
}
