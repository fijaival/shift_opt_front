import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { UserModule } from "./modules/user";
import { DriverModule } from "./modules/driver";

type RootState = {
  version: string;
};

export default createStore<RootState>({
  state: {
    version: "1.0.0", //超単純なプロパティを設定。
  },
  modules: {
    user: UserModule,
    driver: DriverModule,
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return baseUseStore(key);
};
