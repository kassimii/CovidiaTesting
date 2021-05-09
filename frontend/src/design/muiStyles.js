import { createMuiTheme, makeStyles, fade } from '@material-ui/core/styles';

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
  buttonBack: {
    backgroundColor: colours.secondaryLight,
    color: colours.secondaryDark,
    borderRadius: '5px',
    width: '150%',
    height: 45,
    fontSize: 16,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colours.secondaryMedium,
    },
  },
  buttonMdSecondaryMedium: {
    backgroundColor: colours.secondaryMedium,
    color: colours.secondaryLight,
    borderRadius: '5px',
    padding: '0 30px',
    width: 'auto',
    height: 30,
    fontSize: 16,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colours.secondaryDark,
    },
  },
  buttonTable: {
    backgroundColor: colours.secondaryLight,
    color: colours.secondaryDark,
    borderRadius: '5px',
    padding: '0 30px',
    width: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    boxShadow: `0 0 2px 2px ${colours.secondaryMedium}`,
    '&:hover': {
      boxShadow: `0 0 5px 5px ${colours.secondaryDark}`,
    },
  },
  buttonMdPrimaryMedium: {
    backgroundColor: colours.primaryMedium,
    borderRadius: '5px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '60%',
    height: 45,
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.secondaryLight,
    '&:hover': {
      backgroundColor: colours.primaryDark,
    },
  },
  buttonHalf: {
    borderRadius: '5px',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: '20px',
    paddingRight: '20px',
    height: 45,
    width: '95%',
    fontSize: 16,
    fontWeight: 'bold',
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
    padding: 30,
    marginTop: 50,
    backgroundColor: colours.primaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.secondaryDark}`,
  },
  cardPatient: {
    minWidth: '100%',
    display: 'flex',
    width: '30%',
    padding: 30,
    margin: 15,
    backgroundColor: colours.secondaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.primaryDark}`,
  },
  cardPatientCode: {
    height: 45,
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
    color: colours.secondaryLight,
    backgroundColor: colours.primaryLight,
    boxShadow: `3px 3px 10px 2px ${colours.secondaryMedium}`,
    [theme.breakpoints.down('sm')]: {
      padding: '0 5px',
    },
  },
  patientTestTablePrelevation: {
    display: 'block',
  },
  patientTestTable: {
    margin: ' 0 10px',
  },
  testModalHeader: {
    borderBottom: 'solid',
    color: colours.primaryMedium,
  },
  navbar: {
    backgroundColor: colours.secondaryDark,
    padding: 20,
    paddingRight: 50,
    paddingLeft: 50,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(colours.primaryMedium, 0.15),
    height: '100%',
    width: 'auto',
    '&:hover': {
      backgroundColor: fade(colours.primaryDark, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: 24,
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  secondaryLightColour: {
    color: colours.secondaryLight,
  },
  title: {
    margin: 20,
  },
  navbarTitle: {
    fontSize: 24,
    flexGrow: 1,
  },
  navbarTitleLoggedIn: { fontSize: 24, marginRight: 10 },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbarButton: {
    color: colours.secondaryLight,
    padding: 5,
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: 14,
  },
  patientPageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  center: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
