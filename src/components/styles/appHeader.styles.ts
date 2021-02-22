import makeStyles from '@material-ui/core/styles/makeStyles';

export const AppHeaderHook = {
  useAppBarStyles: makeStyles((theme) => ({
    root: {
      top: 0,
      left: 0,
      right: 0,
      width: '1280px',
      [theme.breakpoints.down('md')]: {
        width: '960px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '600px',
      },
      margin: '0 auto',
      background: '#fff',
      color: '#151F32',
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    },
  }), {
    name: 'AppHeader',
  }),
  useToolBarStyles: makeStyles((theme) => ({
    root: {
      justifyContent: 'space-between',
      padding: theme.spacing(2, 3),
      [theme.breakpoints.up('sm')]: {
        minHeight: '72px',
      },
    },
  }), {
    name: 'AppToolBar',
  }),
  useInputSearchStyles: makeStyles((theme) => ({
    input: {
      transition: theme.transitions.create('width'),
      width: '210px',
      '&:focus': {
        width: '25ch',
      },
    },
  }), {
    name: 'InputSearch',
  }),
};
