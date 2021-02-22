import makeStyles from '@material-ui/core/styles/makeStyles';

export const LoaderHook = {
  useLoaderStyles: makeStyles({
    spacer: {
      height: '100%',
      width: '100%',
      minHeight: '50px',
      minWidth: '50px',
      position: 'relative',
    },
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  }, {
    name: 'LoaderStyles',
  }),
  useIconStyles: makeStyles({
    root: {
      width: '50px',
      height: '50px',
    },
  }, {
    name: 'LoaderIcon',
  }),
};
