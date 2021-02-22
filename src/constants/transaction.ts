export const TRANSACTIONS_COLUMNS = [
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
] as const;
