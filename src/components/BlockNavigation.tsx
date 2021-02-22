import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import {
  Loader,
} from 'src/components';

import {
  CommonCardHook,
  BlockNavigationHook,
} from 'src/components/styles';

export const BlockNavigation: FC = observer(() => {
  const CommonCardClasses = CommonCardHook.useCommonCardStyles();
  const ButtonGroupClasses = BlockNavigationHook.useButtonGroupStyles();
  const ButtonClasses = BlockNavigationHook.useButtonStyles();

  return (
    <Card elevation={4} classes={CommonCardClasses}>
      <Loader loading={false}>
        <ButtonGroup
          size="large"
          color="secondary"
          variant="text"
          classes={ButtonGroupClasses}
        >
          <Button
            startIcon={<SkipPreviousIcon />}
            classes={ButtonClasses}
          >
            Previous block
          </Button>
          {true
            && (
            <Button
              endIcon={<SkipNextIcon />}
              classes={ButtonClasses}
            >
              Next block
            </Button>
            )}
        </ButtonGroup>
      </Loader>
    </Card>
  );
});
