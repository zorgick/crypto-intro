import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Container from '@material-ui/core/Container';

import {
  AppHeader,
  AppBody,
} from 'src/components';

import {
  IntroHook,
} from 'src/components/styles';

export const IntroComponent: FC = observer(() => {
  const BodyClasses = IntroHook.useBodyStyles();

  return (
    <Container
      fixed
      classes={BodyClasses}
      maxWidth="lg"
      disableGutters
    >
      <AppHeader />
      <AppBody />
    </Container>
  );
});
