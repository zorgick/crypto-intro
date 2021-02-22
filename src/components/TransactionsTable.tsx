import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';

export const TransactionTable: FC = observer(() => (
  <Box marginTop="24px" height="400px">
    <Paper elevation={4} style={{ height: '100%' }}>
      <DataGrid
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={5}
        hideFooterSelectedRowCount
        disableSelectionOnClick
        rows={[
          {
            id: 1, hash: 'Snow', from: 'Jon', to: 35,
          },
          {
            id: 2, hash: 'Lannister', from: 'Cersei', to: 42,
          },
          {
            id: 3, hash: 'Lannister', from: 'Jaime', to: 45,
          },
          {
            id: 4, hash: 'Stark', from: 'Arya', to: 16,
          },
          {
            id: 5, hash: 'Targaryen', from: 'Daenerys', to: null,
          },
        ]}
        columns={[
          {
            field: 'hash',
            headerName: 'Txn',
            sortable: false,
            flex: 1,
          },
          {
            field: 'from',
            headerName: 'From',
            sortable: false,
            flex: 1,
          },
          {
            field: 'to',
            headerName: 'To',
            sortable: false,
            flex: 1,
          },
        ]}
      />
    </Paper>
  </Box>
));
