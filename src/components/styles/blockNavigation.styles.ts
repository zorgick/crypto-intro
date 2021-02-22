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
    iconSizeLarge: {
      '& > *:first-child': {
        fontSize: '84px',
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
