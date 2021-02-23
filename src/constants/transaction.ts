import { ColDef } from '@material-ui/data-grid';

export const TRANSACTIONS_COLUMNS: ColDef[] = [
  {
    field: 'hash',
    headerName: 'Txn',
    sortable: false,
    filterable: false,
    flex: 3,
    disableColumnMenu: true,
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
];
