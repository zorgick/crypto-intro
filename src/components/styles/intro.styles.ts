import makeStyles from '@material-ui/core/styles/makeStyles';

export const IntroHook = {
  useBodyStyles: makeStyles({
    root: {
      position: 'relative',
    },
  }, {
    name: 'BodyContainer',
  }),
};
