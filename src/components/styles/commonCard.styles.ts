import makeStyles from '@material-ui/core/styles/makeStyles';

export const CommonCardHook = {
  useCommonCardStyles: makeStyles({
    root: {
      height: '137px',
    },
  }, {
    name: 'CommonCardObserver',
  }),
  useCommonCardContentStyles: makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2, 3),
    },
  }), {
    name: 'CommonCardContentObserver',
  }),
};
