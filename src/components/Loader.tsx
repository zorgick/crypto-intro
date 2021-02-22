import React, { FC } from 'react';

import { CircularProgress } from '@material-ui/core';

import { LoaderProps } from 'src/types';

import { LoaderHook } from './styles';

export const Loader: FC<LoaderProps> = ({
  stubComponent, loading, children, mutual,
}) => {
  if (!loading) {
    return <>{stubComponent || children}</>;
  }

  const LoaderClass = LoaderHook.useLoaderStyles();
  const IconClass = LoaderHook.useIconStyles();

  return (
    <div className={LoaderClass.spacer}>
      <div className={LoaderClass.box}>
        <CircularProgress classes={IconClass} />
        {mutual && stubComponent}
      </div>
    </div>
  );
};
