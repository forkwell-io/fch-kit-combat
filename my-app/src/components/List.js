import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  convey:{
    paddingLeft:theme.spacing(5),
    fontFamily:'Roboto',
    color:'#EDB5BF',
    fontWeight: 'bold',
    fontSize:'72px',
    display:'inline-block'
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText className={classes.convey} primary="Inbox" secondary="Secondary"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
    </div>
  );
}
