import {
  types,
  Instance,
  cast,
} from 'mobx-state-tree';

import {
  ResponseBlockTransactionType,
} from 'src/types';
import {
  UniqueIdStore,
} from 'src/stores/models';
import {
  utcTime,
} from 'src/utils';

import {
  Transaction,
} from './index';

export type UniqueBlockStoreModel = Instance<typeof UniqueBlockStore>

export const UniqueBlockStore = types
  .compose('UniqueBlockStore',
    UniqueIdStore,
    types.model({
      id: types.identifier,
      blockHexNumber: types.optional(types.string, ''),
      blockHash: types.optional(types.string, ''),
      requestTime: types.optional(types.string, utcTime(new Date())),
      transactions: types.optional(types.array(Transaction), []),
    }))
  .views((self) => ({
    get blockNumber() {
      return parseInt(self.blockHexNumber, 16);
    },
  }))
  .actions((self) => ({
    formatTransactions(transactions: ResponseBlockTransactionType[]) {
      if (self.transactions.length === 0) {
        self.transactions = cast(transactions.map(({ hash, from, to }) => ({
          id: self.generateUniqueId(),
          hash,
          from,
          to,
        })));
      }
    },
  }));
