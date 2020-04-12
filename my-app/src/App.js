import React from 'react';
import logo from './logo.svg';
import './App.css';
import MediaControlCard from './components/ChatHeader'
import ChatInterface from './components/ChatInterface'
import ButtonAppBar from './components/AppBar'
import SpacingGrid from './components/FrontPage'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SimpleList from "../src/components/List"
import Footer from "../src/components/footer"
const useStyles = makeStyles((theme) => ({
  root: {
    background: '#4D6D9A',
    width:"100%",
    height:"100%"
    
  }
}));

function App() {
  const classes = useStyles();
  return (
   
    <Container maxHeight maxWidth="xl" className={classes.root}>
    <SpacingGrid></SpacingGrid>
  </Container>
  );
}

export default App;
