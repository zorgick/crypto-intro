import {
  types,
  Instance,
  getParent,
} from 'mobx-state-tree';

import {
  FieldGroupStore,
} from 'src/stores/models';

import {
  BLOCK_SEARCH_FIELD,
} from 'src/constants';
import {
  validateNumbersOnly,
} from 'src/utils';

import {
  BlockExplorerStoreModel,
} from '../index';

export type BlockSearchFieldStoreModel = Instance<typeof BlockSearchFieldStore>

export const BlockSearchFieldStore = types
  .compose('BlockSearchFieldStore',
    FieldGroupStore,
    types.model({
      searchBlockId: types.optional(types.string, ''),
    }))
  .actions((self) => ({
    generateField() {
      const fieldId = self.initField(BLOCK_SEARCH_FIELD);
      self.fieldGroup.get(fieldId)!.updateFieldInitialDefinitions({
        inputValidatorFunc: validateNumbersOnly,
      });
      self.searchBlockId = fieldId;
    },
    searchBlock() {
      const blockNumberStringified = self.fieldGroup.get(self.searchBlockId)!.singleValue;
      const { loadBlockNumber, blockMain, setSelectedBlock } = getParent<BlockExplorerStoreModel>(self);

      if (blockNumberStringified === '-1' || blockNumberStringified === '-') {
        loadBlockNumber({ number: '-1' });
      } else if (blockNumberStringified.length > 0) {
        if (blockMain.uniqueIds.has(blockNumberStringified)) {
          const blockId = blockMain.uniqueIds.get(blockNumberStringified)!.uniqueId;
          setSelectedBlock(blockId);
        } else {
          loadBlockNumber({ number: blockNumberStringified });
        }
      }
    },
  }));
