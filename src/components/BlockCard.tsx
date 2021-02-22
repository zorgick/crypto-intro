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
} from 'src/components';

import {
  BlockCardHook,
  CommonCardHook,
} from 'src/components/styles';

export const BlockCard: FC = observer(() => {
  const CommonCardClasses = CommonCardHook.useCommonCardStyles();
  const CommonCardContentClasses = CommonCardHook.useCommonCardContentStyles();
  const BlockCardTextClasses = BlockCardHook.useBlockCardTextStyles();

  const handleMouseDownCopy = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClickCopy = () => 0;

  return (
    <Card elevation={4} classes={CommonCardClasses}>
      <Loader loading={false}>
        <CardContent classes={CommonCardContentClasses}>
          <Box className={BlockCardTextClasses.header}>
            <Typography variant="h4" component="h2">Block number details</Typography>
            <Chip
              label="latest"
              color="secondary"
              size="small"
            />
          </Box>
          <Box className={BlockCardTextClasses.body}>
            <Typography variant="body1" noWrap>hash</Typography>
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
