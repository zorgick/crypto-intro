import makeStyles from '@material-ui/core/styles/makeStyles';

export const SpacerHook = {
  useSpacerTextStyles: makeStyles({
    body1: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  }, {
    name: 'SpacerText',
  }),
};
