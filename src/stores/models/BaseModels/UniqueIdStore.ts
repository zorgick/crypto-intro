import {
  types,
  Instance,
} from 'mobx-state-tree';
import randomString from 'random-string';

export type UniqueIdStoreModel = Instance<typeof UniqueIdStore>;

export const UniqueIdStore = types
  .model('UniqueIdStore', {
    uniqueIds: types.map(types.model({
      id: types.identifier,
      uniqueId: types.string,
    })),
  })
  .volatile(() => ({
    separator: '&',
  }))
  .actions((self) => ({
    generateUniqueId(prefix?: string) {
      let uniqueId = randomString({ length: 12 });
      if (prefix) {
        uniqueId = prefix + self.separator + uniqueId;
        self.uniqueIds.set(prefix, {
          id: prefix,
          uniqueId,
        });
      } else {
        self.uniqueIds.set(uniqueId, {
          id: uniqueId,
          uniqueId,
        });
      }
      return uniqueId;
    },
  }));
