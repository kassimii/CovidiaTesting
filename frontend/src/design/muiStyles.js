import { createMuiTheme, makeStyles, fade } from '@material-ui/core/styles';

const colours = {
  primaryDark: '#6d4794',
  primaryMedium: '#865db1',
  primaryLight: '#a07fc2',
  primaryUltraLight: '#ad91ca',
  secondaryUltraDark: '#626262',
  secondaryDark: '#a2a2a2',
  secondaryMedium: '#f2f2f2',
  secondaryLight: '#f8f8f8',
  green: '#329932',
  greenLight: '#b2d8b2',
  red: '#ff5a5a',
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
    boxShadow: `2px 2px 5px 2px ${colours.secondaryDark}`,
    '&:hover': {
      backgroundColor: colours.secondaryMedium,
      boxShadow: `2px 2px 5px 2px ${colours.secondaryUltraDark}`,
    },
  },
  buttonMd: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '50%',
    height: 45,
    fontSize: 18,
  },
  buttonLg: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    height: 45,
    fontSize: 18,
    '&:hover': {
      boxShadow: `2px 2px 5px 2px ${colours.primaryDark}`,
    },
  },
  buttonBack: {
    color: colours.secondaryDark,
    borderRadius: '5px',
    width: '150%',
    height: 45,
    fontSize: 16,
    fontWeight: 'bold',
    boxShadow: `2px 2px 5px 2px ${colours.secondaryLight}`,
    '&:hover': {
      backgroundColor: colours.secondaryLight,
      boxShadow: `2px 2px 5px 2px ${colours.secondaryMedium}`,
    },
  },
  buttonMdSecondaryMedium: {
    backgroundColor: colours.secondaryDark,
    color: colours.secondaryLight,
    borderRadius: '5px',
    padding: '0 30px',
    width: 'auto',
    height: 30,
    fontSize: 16,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colours.secondaryUltraDark,
    },
  },
  buttonTable: {
    backgroundColor: colours.secondaryLight,
    color: colours.secondaryUltraDark,
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
  buttonAdmin: {
    borderRadius: '5px',
    marginTop: theme.spacing(0.7),
    marginBottom: theme.spacing(1),
    paddingTop: '20px',
    paddingBottom: '20px',
    height: 45,
    width: '95%',
    fontSize: 16,
    fontWeight: 'bold',
    '&:hover': {
      boxShadow: `2px 2px 5px 2px ${colours.secondaryDark}`,
    },
    [theme.breakpoints.down('sm')]: {
      height: 45,
      width: '80%',
      fontSize: 14,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '1px',
      marginBottom: '1px',
      paddingTop: '1px',
      paddingBottom: '1px',
    },
  },
  buttonDownloadCSV: {
    color: colours.secondaryUltraDark,
    backgroundColor: colours.secondaryLight,
    boxShadow: `2px 2px 5px 1px ${colours.secondaryDark}`,
    '&:hover': {
      backgroundColor: colours.secondaryLight,
      boxShadow: `2px 2px 5px 2px ${colours.secondaryUltraDark}`,
    },
  },
  buttonPatientCard: {
    boxShadow: `2px 2px 5px 2px ${colours.primaryMedium}`,
    '&:hover': {
      boxShadow: `2px 2px 5px 4px ${colours.primaryDark}`,
    },
  },
  dropdownAdmin: {
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: '95%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
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
    border: 'solid',
    borderColor: colours.primaryMedium,
    boxShadow: `3px 3px 10px 1px ${colours.primaryLight}`,
    [theme.breakpoints.down('sm')]: {
      padding: '0 5px',
    },
  },
  cardStats: {
    minWidth: '100%',
    margin: '15px 0',
    padding: '10px 40px',
    color: `rgb(96, 63, 131, 0.5)`,
    backgroundColor: `rgb(96, 63, 131, 0.2)`,
    boxShadow: `3px 3px 10px 5px ${colours.primaryLight}`,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0',
    },
  },
  patientTestTable: {
    margin: ' 0 10px',
  },
  testModalHeader: {
    borderBottom: 'solid',
    color: colours.primaryMedium,
  },
  navbar: {
    backgroundColor: colours.secondaryUltraDark,
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
  primaryMediumSoftColour: {
    color: `rgb(96, 63, 131, 0.7)`,
  },
  primaryMediumColour: {
    color: colours.primaryMedium,
  },
  secondaryLightColour: {
    color: colours.secondaryLight,
  },
  secondaryUltraDarkColour: {
    color: colours.secondaryUltraDark,
    backgroundColor: colours.secondaryMedium,
    '&:hover': {
      backgroundColor: colours.secondaryMedium,
    },
  },
  secondaryMediumColour: {
    color: colours.secondaryDark,
  },
  secondaryMediumColourBg: {
    fontWeight: 'bold',
    backgroundColor: colours.secondaryMedium,
    color: colours.secondaryUltraDark,
  },
  green: {
    color: colours.green,
  },
  greenBg: {
    backgroundColor: colours.green,
  },
  red: {
    color: colours.red,
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
  fullWidth: {
    width: '100%',
    overflowX: 'auto',
  },
  borderBottom: {
    borderBottom: 'solid',
  },
  borderRight: {
    borderRight: 'solid',
  },
  paddingStatsCard: {
    padding: '5px 15px',
  },
  paddingStatsCardRight: {
    paddingRight: '20px',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '30px',
    },
  },
  paddingStatsCardLeft: {
    paddingLeft: '10px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '15px',
      paddingRight: '1px',
    },
  },
  statsButtonsAlign: {
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '60px',
    },
  },
  statsGraph: {
    margin: '30px 0',
  },
}));

export { theme, useStyles };
