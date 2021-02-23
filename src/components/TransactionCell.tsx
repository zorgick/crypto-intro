import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import {
  injectDependencies,
} from 'src/utils';
import {
  RootStoreModel,
} from 'src/stores';
import {
  TransactionCellProps,
} from 'src/types';

const mapStore = ({ blockMainStore }: RootStoreModel) => ({
  copyValue: blockMainStore.copyValue,
  truncate: blockMainStore.truncate,
});

export const TransactionCell: FC<TransactionCellProps> = observer(({ params: { value } }) => {
  const {
    copyValue,
    truncate,
  } = injectDependencies(mapStore);

  const handleMouseDownCopy = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClickCopy = () => copyValue(value as string);

  return (
    <>
      <Tooltip title={value as string}>
        <Typography variant="body1">{truncate(value as string, 15)}</Typography>
      </Tooltip>
      <IconButton
        onClick={handleClickCopy}
        onMouseDown={handleMouseDownCopy}
        size="small"
      >
        <FileCopyOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  );
});
