import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { CsrfModule } from "./modules/csrf";
import { UserModule } from "./modules/user";

type RootState = {
  version: string;
};

export default createStore<RootState>({
  state: {
    version: "1.0.0", //超単純なプロパティを設定。
  },
  modules: {
    csrf: CsrfModule,
    user: UserModule,
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return baseUseStore(key);
};
