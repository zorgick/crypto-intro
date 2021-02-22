import {
  types,
  Instance,
} from 'mobx-state-tree';

import {
  BlockMainStore,
} from './index';

export type RootStoreModel = Instance<typeof RootStore>;
export type RootStoreEnv = Record<string, any>;

export const RootStore = types
  .model('RootStore', {
    blockMainStore: BlockMainStore,
  });
