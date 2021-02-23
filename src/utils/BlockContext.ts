import { createContext, useContext } from 'react';

import {
  RootStoreModel,
  MapStoreType,
  useInject,
} from 'src/stores';
import { BlockContextType } from 'src/types';

export const BlockContext = createContext<BlockContextType>({
  blockId: '',
});

export const injectDependencies = <T>(mapStore: MapStoreType<T>) => {
  const { blockId } = useContext(BlockContext);
  return useInject(
    mapStore,
    ({ blockExplorerStore }: RootStoreModel) => blockExplorerStore
      .blockMain
      .blocks
      .get(blockId),
  );
};
