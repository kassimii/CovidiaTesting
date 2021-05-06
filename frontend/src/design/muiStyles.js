import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const colours = {
  primaryDark: '#50487d',
  primaryMedium: '#603f83ff',
  primaryLight: '#745085',
  secondaryDark: '#555555',
  secondaryMedium: '#777777',
  secondaryLight: '#f8f8f8',
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colours.primaryLight,
      main: colours.primaryMedium,
      dark: colours.primaryDark,
    },
    secondary: {
      light: colours.secondaryLight,
      main: colours.secondaryMedium,
      dark: colours.secondaryDark,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  buttonSm: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '25%',
    height: 45,
    fontSize: 18,
  },
  buttonMd: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '50%',
    height: 45,
    fontSize: 18,
  },
  buttonMdSecondaryLight: {
    backgroundColor: colours.secondaryLight,
    borderRadius: '12px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '150%',
    height: 45,
    fontSize: 16,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colours.secondaryMedium,
    },
  },
  center: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '110%',
    padding: 20,
    backgroundColor: colours.secondaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.primaryDark}`,
  },
  cardMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    padding: 20,
    marginTop: 30,
    backgroundColor: colours.primaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.secondaryDark}`,
  },
  navbar: {
    backgroundColor: colours.secondaryDark,
    padding: 20,
    paddingRight: 50,
    paddingLeft: 50,
  },
  secondaryLightColour: {
    color: colours.secondaryLight,
  },
  navbarTitle: {
    flexGrow: 1,
  },
  title: {
    margin: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'right',
  },
  flexDisplay: {
    flexGrow: 1,
  },
}));

export { theme, useStyles };
