import {
  types,
  Instance,
} from 'mobx-state-tree';

import {
  UniqueIdStore,
} from 'src/stores/models';

export type UniqueBlockStoreModel = Instance<typeof UniqueBlockStore>

export const UniqueBlockStore = types
  .compose('UniqueBlockStore',
    UniqueIdStore,
    types.model({
      id: types.identifier,
      blockHexNumber: types.optional(types.string, ''),
      blockHash: types.optional(types.string, ''),
    }))
  .views((self) => ({
    get blockNumber() {
      return parseInt(self.blockHexNumber, 16);
    },
  }));
