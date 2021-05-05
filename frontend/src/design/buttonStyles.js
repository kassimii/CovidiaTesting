import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const colours = {
  primaryDark: '#50487d',
  primaryMedium: '#603f83ff',
  primaryLight: '#745085',
  secondaryDark: '#babdbe',
  secondaryMedium: '#e5e5e5',
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
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '50%',
    height: 45,
    fontSize: 18,
  },
  center: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: colours.secondaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.primaryDark}`,
  },
  navbar: {
    backgroundColor: colours.primaryDark,
  },
  lightLettering: {
    color: colours.secondaryLight,
  },
}));

export { theme, useStyles };
