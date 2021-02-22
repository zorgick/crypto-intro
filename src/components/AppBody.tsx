import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import {
  BlockCard,
  BlockNavigation,
  TransactionTable,
} from 'src/components';

export const AppBody: FC = observer(() => (
  <Box marginTop="128px">
    <Grid
      container
      direction="row"
      alignItems="flex-start"
    >
      <Grid item xs={8}>
        <BlockCard />
      </Grid>
      <Grid item xs={4}>
        <Box marginLeft="24px">
          <BlockNavigation />
        </Box>
      </Grid>
    </Grid>
    <TransactionTable />
  </Box>
));
