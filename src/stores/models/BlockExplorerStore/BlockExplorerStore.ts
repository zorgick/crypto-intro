import {
  types,
  Instance,
  flow,
} from 'mobx-state-tree';

import {
  CopyFactoryStore,
} from 'src/stores/models';
import {
  ResponseBlockType,
  ParamsGetBlockInfoType,
} from 'src/types';
import {
  getLatestBlockInfo,
  getBlockInfo,
} from 'src/services';
import {
  identifyError,
} from 'src/utils';

import {
  BlockMainStore,
} from './index';

export type BlockExplorerStoreModel = Instance<typeof BlockExplorerStore>

export const BlockExplorerStore = types
  .compose('BlockExplorerStore',
    CopyFactoryStore,
    types.model({
      isBlockLoading: types.optional(types.boolean, false),
      latestBlockId: types.optional(types.string, ''),
      blockLoadingError: types.optional(types.string, ''),
      selectedBlock: types.optional(types.string, ''),
      blockMain: types.optional(BlockMainStore, {}),
    }))
  .views((self) => ({
    get isLatestBlock() {
      return self.latestBlockId === self.selectedBlock;
    },
  }))
  .actions((self) => ({
    setSelectedBlock(blockId: string) {
      self.selectedBlock = blockId;
    },
    setLatestBlock(blockId: string) {
      self.latestBlockId = blockId;
    },
    loadLatestBlock: flow(function* loadLatestBlock(params: ParamsGetBlockInfoType) {
      try {
        self.isBlockLoading = true;
        if (self.blockLoadingError) {
          self.blockLoadingError = '';
        }
        const { result }: ResponseBlockType = yield getLatestBlockInfo(params);
        const blockId = self.blockMain.createBlockEntry({
          blockHexNumber: result.number,
          blockHash: result.hash,
          latest: true,
        });
        self.selectedBlock = blockId;
        self.blockMain.blocks.get(blockId)!.formatTransactions(result.transactions);
      } catch (error) {
        const { message } = identifyError(error);
        self.blockLoadingError = message;
      } finally {
        self.isBlockLoading = false;
      }
    }),
    loadBlockNumber: flow(function* loadBlockNumber(params: ParamsGetBlockInfoType) {
      try {
        self.isBlockLoading = true;
        if (self.blockLoadingError) {
          self.blockLoadingError = '';
        }
        const { result }: ResponseBlockType = yield getBlockInfo(params);
        const blockId = self.blockMain.createBlockEntry({
          blockHexNumber: result.number,
          blockHash: result.hash,
        });
        self.selectedBlock = blockId;
        self.blockMain.blocks.get(blockId)!.formatTransactions(result.transactions);
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
