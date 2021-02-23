import {
  types,
  Instance,
} from 'mobx-state-tree';

import {
  ParamsInitFieldType,
} from 'src/types';

import {
  FormField,
  UniqueIdStore,
} from './index';

export type FieldGroupStoreModel = Instance<typeof FieldGroupStore>;

export const FieldGroupStore = types
  .compose('FieldGroupStore',
    UniqueIdStore,
    types.model({
      fieldGroup: types.map(FormField),
    }))
  .views((self) => ({
    get fieldIds() {
      const fieldIds: string[][] = [];
      self.fieldGroup.forEach(({ id, fieldAnchor }) => {
        if (id) {
          fieldIds.push([id, fieldAnchor]);
        }
      });

      return fieldIds;
    },
    get hasFields() {
      return self.fieldGroup.size > 0;
    },
  }))
  .actions((self) => ({
    innerChangeField(fieldId: string, selected: string) {
      const field = self.fieldGroup.get(fieldId);
      if (!field) {
        throw new Error('Unable to set a value to a nonexisting field');
      }
      field.setValue(selected);
    },
    initField({
      fieldAnchor,
      label,
      disabled = false,
      required = false,
      needsPrefix = true,
      singleValue = '',
      placeholder = '',
      helperText = '',
    }: ParamsInitFieldType) {
      const fieldId = self.generateUniqueId(needsPrefix ? fieldAnchor : undefined);
      self.fieldGroup.set(fieldId, {
        id: fieldId,
        fieldAnchor,
        label,
        disabled,
        required,
        singleValue,
        placeholder,
        helperText,
      });
      return fieldId;
    },
  }));
