import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {
  SpacerProps,
} from 'src/types';

import {
  SpacerHook,
} from 'src/components/styles/spacer.styles';

export const Spacer: FC<SpacerProps> = ({ text }) => {
  if (!text) {
    throw new Error('Property text is required.');
  }
  const SpacerTextClasses = SpacerHook.useSpacerTextStyles();

  return (
    <Box position="relative" width="100%" minHeight="60px" height="100%">
      <Typography variant="body1" classes={SpacerTextClasses}>{text}</Typography>
    </Box>
  );
};
