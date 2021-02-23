import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { DataGrid, CellParams } from '@material-ui/data-grid';

import { TRANSACTIONS_COLUMNS } from 'src/constants';
import {
  injectDependencies,
} from 'src/utils';
import {
  RootStoreModel,
  UniqueBlockStoreModel,
} from 'src/stores';
import {
  Loader,
  Spacer,
  TransactionCell,
} from 'src/components';

const mapStore = ({ blockMainStore }: RootStoreModel, blockStore: UniqueBlockStoreModel) => ({
  isBlockLoading: blockMainStore.isBlockLoading,
  blockLoadingError: blockMainStore.blockLoadingError,
  transactions: blockStore?.transactions,
});

export const TransactionTable: FC = observer(() => {
  const {
    isBlockLoading,
    blockLoadingError,
    transactions,
  } = injectDependencies(mapStore);

  return (
    <Box marginTop="24px" height="700px">
      <Paper elevation={4} style={{ height: '100%' }}>
        <Loader
          loading={isBlockLoading}
          stubComponent={blockLoadingError && <Spacer text={blockLoadingError} />}
        >
          <DataGrid
            rowsPerPageOptions={[10, 30, 60]}
            pageSize={10}
            hideFooterSelectedRowCount
            disableSelectionOnClick
            rows={transactions}
            columns={TRANSACTIONS_COLUMNS.map((column) => {
              if (column.field === 'from' || column.field === 'to') {
                return {
                  ...column,
                  renderCell: (params: CellParams) => <TransactionCell params={params} />,
                };
              }
              return column;
            })}
          />
        </Loader>
      </Paper>
    </Box>
  );
});
