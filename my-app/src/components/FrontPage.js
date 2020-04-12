import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import ChatInterface from '../components/ChatInterface';
import ButtonAppBar from '../components/AppBar'
import 'typeface-roboto';
import { colors } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Divider } from '@material-ui/core';
import ContainedButtons from "../components/ButtonView"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  chatinterface: {
    
        padding:theme.spacing(5),
      alignCenter: 'center'
  },
  firsttext:{
        paddingLeft:theme.spacing(5),
        paddingBottom:theme.spacing(2),
        paddingTop:theme.spacing(9),
        fontFamily:'Roboto',
        color:'white',
        fontWeight: 'bold',
        fontSize:'58px',
        marginBottom:'0px',
        marginTop:'0px'
  },
  convey:{
    paddingLeft:theme.spacing(5),
    fontFamily:'Roboto',
    color:'#EDB5BF',
    fontWeight: 'bold',
    fontSize:'36px',
    display:'inline-block'
  },
  Reduce:{
    paddingLeft:theme.spacing(5),
    fontFamily:'Roboto',
    color:'#99CED3',
    fontWeight: 'bold',
    fontSize:'36px',
    display:'inline-block'
  },
  Rapid:{
    paddingLeft:theme.spacing(5),
    fontFamily:'Roboto',
    color:'#86B3D1',
    fontWeight: 'bold',
    fontSize:'36px',
  },

  secondaryTexts:{
    paddingLeft:theme.spacing(5),
    fontFamily:'Roboto',
    color:'white'
  },
  hr:{
      width:700,
      height:5,
  },

  hr2:{
    marginTop:theme.spacing(2),
    width:700,
    height:5,
  }
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  return (
    <Grid container className={classes.root} >
      <Grid item lg={8}>
          <h1 className={classes.firsttext}> COVNECT</h1>
          <Divider className={classes.hr}/>
          
          <h2>
              <span className = {classes.convey}>

              CONVEY &nbsp; 
              </span>
              <br/>
                <span className = {classes.secondaryTexts}>
                COVID-19 information quickly
                </span>
            </h2>
          <h2>
          <span className = {classes.Reduce}>
              REDUCE &nbsp;
              </span>
              <br/>
              <span className = {classes.secondaryTexts}>
                   bottlenecks at health-care institutions
                </span>
            </h2>

          <h2>
              <span className = {classes.Rapid}>
                RAPID &nbsp;
              </span>
              <br/>
              <span className = {classes.secondaryTexts}>
                 access to response from health-care institutions near you
                 <Divider className={classes.hr2}/>
                </span>
            </h2>
            {/*<ContainedButtons></ContainedButtons>*/}
        </Grid>
        <Grid item lg={4} className = {classes.chatinterface}>
           <iframe src="https://forkwell.azurewebsites.net/" height="575" width="500" align="right" />
        </Grid>
    </Grid>
  );
}
