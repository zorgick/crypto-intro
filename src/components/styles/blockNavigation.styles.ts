import makeStyles from '@material-ui/core/styles/makeStyles';
import { grey } from '@material-ui/core/colors';

export const BlockNavigationHook = {
  useButtonGroupStyles: makeStyles({
    root: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
      '& > *': {
        borderRadius: 0,
        width: '50%',
      },
    },
  }, {
    name: 'BlockNavigationButtonGroup',
  }),
  useButtonStyles: makeStyles((theme) => ({
    textSizeLarge: {
      [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
      },
    },
    iconSizeLarge: {
      '& > *:first-child': {
        fontSize: '84px',
        [theme.breakpoints.down('md')]: {
          fontSize: '56px',
        },
      },
    },
    textSecondary: {
      color: grey[400],
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  }), {
    name: 'BlockNavigationButton',
  }),
};
