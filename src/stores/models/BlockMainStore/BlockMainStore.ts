import {
  types,
  Instance,
  flow,
} from 'mobx-state-tree';

import {
  UniqueIdStore,
} from 'src/stores/models';
import {
  ResponseBlockType,
  ParamsGetBlockInfoType,
} from 'src/types';
import {
  getLatestBlockInfo,
} from 'src/services';
import {
  identifyError,
} from 'src/utils';

import {
  UniqueBlockStore,
} from './index';

export type BlockMainStoreModel = Instance<typeof BlockMainStore>

export const BlockMainStore = types
  .compose('BlockMainStore',
    UniqueIdStore,
    types.model({
      isBlockLoading: types.optional(types.boolean, false),
      latestBlockId: types.optional(types.string, ''),
      blockLoadingError: types.optional(types.string, ''),
      selectedBlock: types.optional(types.string, ''),
      blocks: types.optional(types.map(UniqueBlockStore), {}),
    }))
  .views((self) => ({
    get isLatestBlock() {
      return self.latestBlockId === self.selectedBlock;
    },
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
        self.latestBlockId = uniqueId;
      }

      self.blocks.set(uniqueId, {
        id: uniqueId,
        blockHexNumber,
        blockHash,
      });
      return uniqueId;
    },
    setSelectedBlock(blockId: string) {
      self.selectedBlock = blockId;
    },
  }))
  .actions((self) => ({
    loadLatestBlock: flow(function* loadLatestBlock(params: ParamsGetBlockInfoType) {
      try {
        self.isBlockLoading = true;
        if (self.blockLoadingError) {
          self.blockLoadingError = '';
        }
        const { result }: ResponseBlockType = yield getLatestBlockInfo(params);
        const blockId = self.createBlockEntry({
          blockHexNumber: result.number,
          blockHash: result.hash,
          latest: true,
        });
        self.setSelectedBlock(blockId);
        // self.blocks.get(blockId)!.formatTransactions(result.transactions);
      } catch (error) {
        const { message } = identifyError(error);
        self.blockLoadingError = message;
      } finally {
        self.isBlockLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      self.loadLatestBlock({});
    },
  }));
