import { configureStore } from 'mst-storebooster';

import {
  RootStore,
  RootStoreModel,
  RootStoreEnv,
  BlockMainStore,
} from 'src/stores/models';

import {
  GeneralParams,
} from 'src/types';

export type InstantiatedStoresType = typeof InstantiatedStoresBox;
export type InstantiatedBusStoresType = typeof InstantiatedBusStores;

const blockMainStoreInstance = BlockMainStore.create();

export const InstantiatedStoresBox = {
  blockMainStore: blockMainStoreInstance,
};

export const InstantiatedBusStores = {};

// create root store with necessary stores
// and export all utils
export const {
  StoreContext,
  StoreProvider,
  useStore,
  rootStore,
} = configureStore<
  RootStoreModel,
  RootStoreEnv,
  InstantiatedStoresType,
  InstantiatedBusStoresType
>({
  RootStore,
  InstantiatedStoresBox,
  Bus: InstantiatedBusStores,
});

// it will be here for a while
export type MapStoreType<T> = (store: any, selectedData?: any) => T;

export type PickStoreType<T> = (store: RootStoreModel | null) => T;

export const useInject = <T1, T2>(
  mapStore: MapStoreType<T1>,
  selection?: GeneralParams | PickStoreType<T2>,
) => {
  const store = useStore();
  if (typeof selection === 'function') {
    const specificStore = selection(store);
    return mapStore(store, specificStore);
  }
  return mapStore(store, selection);
};
