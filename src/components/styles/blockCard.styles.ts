import makeStyles from '@material-ui/core/styles/makeStyles';

export const BlockCardHook = {
  useBlockCardTextStyles: makeStyles((theme) => ({
    header: {
      display: 'flex',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    body: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(4),
      '& > * + *': {
        marginLeft: theme.spacing(1),
      },
    },
  }), {
    name: 'BlockCardText',
  }),

};
