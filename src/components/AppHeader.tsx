import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import {
  ProtoField,
} from 'src/components';
import {
  injectDependencies,
} from 'src/utils';
import {
  RootStoreModel,
} from 'src/stores';

import {
  AppHeaderHook,
} from 'src/components/styles';

const mapStore = ({ blockExplorerStore }: RootStoreModel) => ({
  hasFields: blockExplorerStore.blockSearchField.hasFields,
  fieldIds: blockExplorerStore.blockSearchField.fieldIds,
  fieldGroup: blockExplorerStore.blockSearchField.fieldGroup,
  changeField: blockExplorerStore.blockSearchField.innerChangeField,
});

export const AppHeader: FC = observer(() => {
  const {
    hasFields,
    fieldIds,
    fieldGroup,
    changeField,
  } = injectDependencies(mapStore);
  const AppBarClasses = AppHeaderHook.useAppBarStyles();
  const ToolBarClasses = AppHeaderHook.useToolBarStyles();
  const InputSearchClasses = AppHeaderHook.useInputSearchStyles();

  const handleMouseDownSearch = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClickSearch = () => 0;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Ethereum blocks observer"
        />
        <title>Ethereum explorer</title>
        <style>{'body { margin: 0; height: 100vh; }'}</style>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <AppBar position="fixed" classes={AppBarClasses}>
        <Toolbar classes={ToolBarClasses}>
          <Typography variant="h1">Ethereum explorer</Typography>
          {hasFields && fieldIds.map(([id]: string[]) => (
            <ProtoField
              key={id}
              field={fieldGroup.get(id)!}
              changeField={changeField}
              inputProps={{ classes: InputSearchClasses }}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickSearch}
                    onMouseDown={handleMouseDownSearch}
                    size="small"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
});
