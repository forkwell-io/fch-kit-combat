import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    color : '#5F6366' ,
      fontSize: '50px',
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(5)

    }
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained"size='large' fontSize='5px'>
        Goto CDC Core Protocol
      </Button>
    </div>
  );
}
