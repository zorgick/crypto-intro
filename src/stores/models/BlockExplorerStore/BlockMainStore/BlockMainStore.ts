import {
  types,
  Instance,
  getParent,
} from 'mobx-state-tree';

import {
  UniqueIdStore,
  BlockExplorerStoreModel,
} from 'src/stores/models';

import {
  UniqueBlockStore,
} from './index';

export type BlockMainStoreModel = Instance<typeof BlockMainStore>

export const BlockMainStore = types
  .compose('BlockMainStore',
    UniqueIdStore,
    types.model({
      blocks: types.optional(types.map(UniqueBlockStore), {}),
    }))
  .actions((self) => ({
    createBlockEntry({
      blockHexNumber,
      blockHash,
      latest = false,
    }: {
      blockHexNumber: string;
      blockHash: string;
      latest?: boolean;
    }) {
      // do not generate a new block in the store if the block number
      // already exists in the store
      if (self.uniqueIds.has(blockHexNumber)) {
        return self.uniqueIds.get(blockHexNumber)!.uniqueId;
      }

      const uniqueId = self.generateUniqueId(blockHexNumber);

      // this affects view and logic scenarios
      if (latest) {
        const { setLatestBlock } = getParent<BlockExplorerStoreModel>(self);
        setLatestBlock(uniqueId);
      }

      self.blocks.set(uniqueId, {
        id: uniqueId,
        blockHexNumber,
        blockHash,
      });
      return uniqueId;
    },
  }));
