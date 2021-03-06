import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  app: {
    maxWidth: '100%',
    paddingLeft: 0,
    paddingRight: 0,

  },
  appBar: {
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  navLinks: {
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: "column-reverse"
    }
  },
  mainContainer: {
    height: '100%',
    marginTop: '5vmin',
  }
}));