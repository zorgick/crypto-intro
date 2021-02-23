import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import {
  Loader,
  Spacer,
} from 'src/components';
import {
  injectDependencies,
} from 'src/utils';
import {
  RootStoreModel,
  UniqueBlockStoreModel,
} from 'src/stores';

import {
  BlockCardHook,
  CommonCardHook,
} from 'src/components/styles';

const mapStore = ({ blockMainStore }: RootStoreModel, blockStore: UniqueBlockStoreModel) => ({
  isBlockLoading: blockMainStore.isBlockLoading,
  isLatestBlock: blockMainStore.isLatestBlock,
  blockLoadingError: blockMainStore.blockLoadingError,
  copyValue: blockMainStore.copyValue,
  blockNumber: blockStore?.blockNumber,
  blockHash: blockStore?.blockHash,
});

export const BlockCard: FC = observer(() => {
  const {
    isBlockLoading,
    isLatestBlock,
    blockLoadingError,
    copyValue,
    blockNumber,
    blockHash,
  } = injectDependencies(mapStore);

  const CommonCardClasses = CommonCardHook.useCommonCardStyles();
  const CommonCardContentClasses = CommonCardHook.useCommonCardContentStyles();
  const BlockCardTextClasses = BlockCardHook.useBlockCardTextStyles();

  const handleMouseDownCopy = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClickCopy = () => copyValue(blockHash);

  return (
    <Card elevation={4} classes={CommonCardClasses}>
      <Loader
        loading={isBlockLoading}
        stubComponent={blockLoadingError && <Spacer text={blockLoadingError} />}
      >
        <CardContent classes={CommonCardContentClasses}>
          <Box className={BlockCardTextClasses.header}>
            <Typography variant="h4" component="h2">{`Block #${blockNumber} details`}</Typography>
            {isLatestBlock
              && (
                <Chip
                  label="latest"
                  color="secondary"
                  size="small"
                />
              )}
          </Box>
          <Box className={BlockCardTextClasses.body}>
            <Typography variant="body1" noWrap>{blockHash}</Typography>
            <IconButton
              onClick={handleClickCopy}
              onMouseDown={handleMouseDownCopy}
              size="small"
            >
              <FileCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Loader>
    </Card>
  );
});
