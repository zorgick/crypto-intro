import {
  types,
  Instance,
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

export type BlockSearchFieldStoreModel = Instance<typeof BlockSearchFieldStore>

export const BlockSearchFieldStore = types
  .compose('BlockSearchFieldStore',
    FieldGroupStore,
    types.model({}))
  .actions((self) => ({
    generateField() {
      const fieldId = self.initField(BLOCK_SEARCH_FIELD);
      self.fieldGroup.get(fieldId)?.updateFieldInitialDefinitions({
        inputValidatorFunc: validateNumbersOnly,
      });
    },
  }));
