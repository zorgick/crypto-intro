import {
  types,
  Instance,
  flow,
} from 'mobx-state-tree';

export type CopyFactoryStoreModel = Instance<typeof CopyFactoryStore>

export const CopyFactoryStore = types
  .model('CopyFactoryStore', {
    isCopyInProgress: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    copyValue: flow(function* copyValue(text: string) {
      try {
        self.isCopyInProgress = true;
        if (!text) {
          throw new Error('Buffer cannot copy void; Provide string.');
        }
        yield window.navigator.clipboard.writeText(text);
      } catch (error) {
        throw new Error('Write to clipboard was not successful');
      } finally {
        self.isCopyInProgress = false;
      }
    }),
  }));
