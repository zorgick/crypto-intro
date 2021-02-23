import {
  types,
  Instance,
} from 'mobx-state-tree';

export type FormFieldModel = Instance<typeof FormField>;

export const FormField = types
  .model('FormField', {
    id: types.identifier,
    fieldAnchor: types.string,
    label: types.optional(types.string, ''),
    disabled: types.optional(types.boolean, false),
    required: types.optional(types.boolean, false),
    error: types.maybe(types.string),
    placeholder: types.maybe(types.string),
    helperText: types.maybe(types.string),
    singleValue: types.optional(types.string, ''),
  })
  .volatile(() => ({
    inputValidatorFunc: undefined as any,
  }))
  .actions((self) => ({
    updateFieldInitialDefinitions({
      inputValidatorFunc,
    }: {
      inputValidatorFunc?: (input: string) => string;
    }) {
      if (inputValidatorFunc) {
        self.inputValidatorFunc = inputValidatorFunc;
      }
    },
    setValue(selected?: string) {
      if (self.error) {
        self.error = '';
      }
      if (selected) {
        if (typeof self.inputValidatorFunc === 'function') {
          self.singleValue = self.inputValidatorFunc(selected);
        } else {
          self.singleValue = `${selected}`;
        }
      } else {
        self.singleValue = '';
      }
    },
    toggleDisabled(disabled: boolean) {
      self.disabled = disabled;
    },
    setError(error: string) {
      self.error = error;
    },
    toggleRequired(required: boolean) {
      self.required = required;
    },
  }));
