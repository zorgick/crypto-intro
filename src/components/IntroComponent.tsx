import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Container from '@material-ui/core/Container';

import {
  AppHeader,
  AppBody,
} from 'src/components';
import {
  RootStoreModel,
  useInject,
} from 'src/stores';
import {
  BlockContext,
} from 'src/utils';
import {
  IntroHook,
} from 'src/components/styles';

const mapStore = ({ blockMainStore }: RootStoreModel) => ({
  selectedBlock: blockMainStore.selectedBlock,
});

export const IntroComponent: FC = observer(() => {
  const {
    selectedBlock,
  } = useInject(mapStore);
  const BodyClasses = IntroHook.useBodyStyles();

  return (
    <Container
      fixed
      classes={BodyClasses}
      maxWidth="lg"
      disableGutters
    >
      <BlockContext.Provider value={{ blockId: selectedBlock }}>
        <AppHeader />
        <AppBody />
      </BlockContext.Provider>
    </Container>
  );
});
