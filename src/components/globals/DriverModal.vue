<script lang="ts">
import TextArea from "../parts/TextArea.vue";
import { Driver } from "../../types";
import { DriverPostBody } from "../../types/axios";
export default {
  name: "DriverModal",
  components: {
    TextArea,
  },
  props: {
    driver: { type: Object as () => Driver, required: false },
    closeModal: {
      type: Function,
      required: true,
    },
    saveDriver: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      originalDriver: this.isNewDriver()
        ? null
        : JSON.parse(JSON.stringify(this.driver)),
      targetDriver: this.isNewDriver()
        ? this.initializeNewDriver()
        : (JSON.parse(JSON.stringify(this.driver)) as Driver),
      message: "" as string,
    };
  },
  watch: {
    driver: {
      immediate: true,
      handler(newDriver) {
        this.targetDriver = JSON.parse(JSON.stringify(newDriver)) as Driver;
        this.originalDriver = JSON.parse(JSON.stringify(newDriver)) as Driver;
      },
    },
  },
  computed: {
    isVaildNewDriver() {
      if (!this.isNewDriver()) {
        if (
          JSON.stringify(this.targetDriver) ===
          JSON.stringify(this.originalDriver)
        ) {
          this.message = "";
          return false;
        }
      }
      const isNameValid =
        this.targetDriver.first_name.trim() !== "" &&
        this.targetDriver.last_name.trim() !== "";
      return isNameValid;
    },
  },
  methods: {
    isNewDriver() {
      return !this.driver?.id;
    },
    initializeNewDriver() {
      return {
        last_name: "",
        first_name: "",
      } as DriverPostBody;
    },
    clickEvent() {
      this.closeModal();
    },
    stopEvent(event: Event) {
      event.stopPropagation();
    },
    registerNewDriver() {
      this.saveDriver(this.targetDriver);
      this.closeModal();
    },
  },
};
</script>
<template>
  <div id="overlay" @click="clickEvent">
    <div id="content" @click="stopEvent">
      <div class="mt-8 mb-8 text-left w-3/5">
        <div class="flex justify-between">
          <label class="text-2xl block mt-2 mb-4"
            >{{ isNewDriver() ? "新規ドライバー登録" : "ドライバー情報更新" }}
          </label>
          <button @click="clickEvent">cancel</button>
        </div>
        <div class="mb-8">
          <label class="text-sm block">姓 </label>

          <TextArea
            id="lastName"
            v-model="targetDriver.last_name"
            placeholder="姓"
            type="text"
          ></TextArea>
        </div>
        <div class="mb-8">
          <label class="text-sm block">名 </label>
          <TextArea
            id="firstName"
            v-model="targetDriver.first_name"
            placeholder="名"
            type="text"
          >
          </TextArea>
        </div>
        <div class="text-right">
          <div>
            {{ message }}
          </div>

          <button
            class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100"
            @click="registerNewDriver"
            :disabled="!isVaildNewDriver"
          >
            {{ isNewDriver() ? "登録" : "更新" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 1;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 60%;
  padding: 1em;
  background: #fff;
}
</style>
