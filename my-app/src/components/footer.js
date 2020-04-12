import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        fontVariant:'body1',
      color: '#EDB5BF',
      alignSelf: 'center'
    },
    footer: {
        backgroundColor: '#4D6D9A',
        // marginTop: theme.spacing(8),
        //padding: theme.spacing(1, 0),
      },
}));

function Copyright() {
    const classes = useStyles();
  return (
   <p className = {classes.root}>
        Project submission for the ForkWell Coronavirus Hack by Marcos Concon
    </p>
  );
}


export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </footer>
  );
}
