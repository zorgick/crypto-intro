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
  utcTime,
} from 'src/utils';

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
    checkRelativeEntry(currentBlock: string, relativePosition: 'forward' | 'backward') {
      let relativeEntryId = '';
      const currentBlockNumber = parseInt(currentBlock.substring(
        0,
        currentBlock.indexOf('&'),
      ), 10);
      const relativeBlockNumberStringified = `${currentBlockNumber + (relativePosition === 'forward' ? 1 : -1)}`;
      if (self.uniqueIds.has(relativeBlockNumberStringified)) {
        relativeEntryId = self.uniqueIds.get(relativeBlockNumberStringified)!.uniqueId;
      }
      return {
        relativeBlockId: relativeEntryId,
        relativeBlockNumber: relativeBlockNumberStringified,
      };
    },
    createBlockEntry({
      blockHexNumber,
      blockHash,
      latest = false,
    }: {
      blockHexNumber: string;
      blockHash: string;
      latest?: boolean;
    }) {
      const blockNumberStringified = `${parseInt(blockHexNumber, 16)}`;
      // do not generate a new block in the store if the block number
      // already exists in the store
      if (self.uniqueIds.has(blockNumberStringified)) {
        return self.uniqueIds.get(blockNumberStringified)!.uniqueId;
      }

      const uniqueId = self.generateUniqueId(blockNumberStringified);

      // this affects view and logic scenarios
      if (latest) {
        const { setLatestBlock } = getParent<BlockExplorerStoreModel>(self);
        setLatestBlock(uniqueId);
      }

      self.blocks.set(uniqueId, {
        id: uniqueId,
        blockHexNumber,
        blockHash,
        requestTime: utcTime(new Date()),
      });
      return uniqueId;
    },
  }));
