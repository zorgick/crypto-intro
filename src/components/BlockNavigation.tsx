import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import {
  Loader,
  Spacer,
} from 'src/components';
import {
  injectDependencies,
} from 'src/utils';
import {
  RootStoreModel,
} from 'src/stores';

import {
  CommonCardHook,
  BlockNavigationHook,
} from 'src/components/styles';

const mapStore = ({ blockExplorerStore }: RootStoreModel) => ({
  isBlockLoading: blockExplorerStore.isBlockLoading,
  blockLoadingError: blockExplorerStore.blockLoadingError,
  isLatestBlock: blockExplorerStore.isLatestBlock,
  changeBlock: blockExplorerStore.changeBlock,
});

export const BlockNavigation: FC = observer(() => {
  const {
    isBlockLoading,
    blockLoadingError,
    isLatestBlock,
    changeBlock,
  } = injectDependencies(mapStore);
  const CommonCardClasses = CommonCardHook.useCommonCardStyles();
  const ButtonGroupClasses = BlockNavigationHook.useButtonGroupStyles();
  const ButtonClasses = BlockNavigationHook.useButtonStyles();

  const handleNextClick = () => {
    if (!isLatestBlock) {
      changeBlock('forward');
    }
  };

  const handlePreviosClick = () => {
    changeBlock('backward');
  };

  return (
    <Card elevation={4} classes={CommonCardClasses}>
      <Loader
        loading={isBlockLoading}
        stubComponent={blockLoadingError && <Spacer text={blockLoadingError} />}
      >
        <ButtonGroup
          size="large"
          color="secondary"
          variant="text"
          classes={ButtonGroupClasses}
        >
          <Button
            startIcon={<SkipPreviousIcon />}
            classes={ButtonClasses}
            onClick={handlePreviosClick}
          >
            Previous block
          </Button>
          {!isLatestBlock
            && (
              <Button
                endIcon={<SkipNextIcon />}
                classes={ButtonClasses}
                onClick={handleNextClick}
              >
                Next block
              </Button>
            )}
        </ButtonGroup>
      </Loader>
    </Card>
  );
});
