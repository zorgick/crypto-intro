// @ts-ignore
import React, { FC } from 'react';

import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';

import { StoreProvider } from 'src/stores';
import { IntroComponent } from 'src/components';
import 'src/utils/transport';
import { globalTheme } from 'src/utils';

export const App: FC = () => (
  <StoreProvider>
    <ThemeProvider theme={globalTheme}>
      <StylesProvider injectFirst>
        <IntroComponent />
      </StylesProvider>
    </ThemeProvider>
  </StoreProvider>
);
