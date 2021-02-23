import {
  types,
  Instance,
} from 'mobx-state-tree';

export type TransactionModel = Instance<typeof Transaction>

export const Transaction = types
  .model('Transaction', {
    id: types.identifier,
    hash: types.optional(types.string, ''),
    from: types.optional(types.string, ''),
    to: types.optional(types.string, ''),
  });
