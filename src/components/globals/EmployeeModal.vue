<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import type {
  Employee,
  Qualification,
  Restriction,
  EmployeeModal,
} from "../../types";
import type { EmployeePostBody } from "../../types/axios";
import TextArea from "../parts/TextArea.vue";
import CheckLabel from "../parts/CheckLabel.vue";
import CheckBox from "../parts/CheckBox.vue";
import MiddleTitle from "../parts/MiddleTitle.vue";
import RedWhiteButton from "../parts/RedWhiteButton.vue";

export default {
  name: "EmployeeModal",
  components: {
    TextArea,
    CheckLabel,
    CheckBox,
    MiddleTitle,
    RedWhiteButton,
  },
  props: {
    employee: {
      type: Object as () => EmployeePostBody,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    buttonTitle: {
      type: String,
      required: true,
    },
    handleEmployee: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      message: "",
      targetEmployee: JSON.parse(
        JSON.stringify(this.employee)
      ) as EmployeeModal,
    };
  },
  watch: {
    employee: {
      immediate: true,
      handler(newEmployee: EmployeePostBody) {
        this.targetEmployee = newEmployee;

        console.log(this.targetEmployee);
      },
    },
  },

  computed: {
    ...mapGetters({
      getEmployees: "employee/getEmployees",
      getQualifications: "qualification/getQualifications",
      getRestrictions: "restriction/getRestrictions",
    }),
    isValidNewEmployee() {
      const isNameValid =
        this.targetEmployee.first_name.trim() !== "" &&
        this.targetEmployee.last_name.trim() !== "";
      const areRestrictionsValid = this.targetEmployee.restrictions.every(
        (ri) => {
          const isSelected = ri.id !== null;
          const isValueValid = typeof ri.value === "number" && ri.value! >= 1;
          return isSelected ? isValueValid : true;
        }
      );
      const uniqueRestrictionIds = new Set(
        this.targetEmployee.restrictions
          .map((ri) => ri.id)
          .filter((id) => id !== null)
      );
      const areRestrictionIdsUnique =
        uniqueRestrictionIds.size ===
        this.targetEmployee.restrictions.filter((ri) => ri.id !== null).length;

      const uniqueDependency = new Set(
        this.targetEmployee.dependencies
          .map((dep) => dep.id)
          .filter((id) => id !== null)
      );
      const areDependenciesUnique =
        uniqueDependency.size ===
        this.targetEmployee.dependencies.filter((dep) => dep.id !== null)
          .length;
      console.log(this.targetEmployee.id);

      if (this.targetEmployee.id) {
        if (
          this.targetEmployee.dependencies.some(
            (dep) => dep.id == this.targetEmployee.id
          )
        ) {
          this.message = "自身を依存関係に登録できません";
          return false;
        }
      }
      if (!areRestrictionIdsUnique) {
        this.message = "同じ制約条件を設定できません";
        return false;
      } else if (!areRestrictionsValid) {
        this.message = "制約条件の値が無効です";
        return false;
      } else if (!isNameValid) {
        this.message = "名前を入力してください";
        return false;
      } else if (!areDependenciesUnique) {
        this.message = "同じ従業員を依存関係に含めることはできません。";
        return false;
      }
      this.message = "";
      return isNameValid && areRestrictionsValid && areRestrictionIdsUnique;
      return true;
    },
  },
  methods: {
    ...mapActions({
      addEmployee: "employee/addEmployee",
    }),
    clickEvent() {
      console.log("employeeModalでの初期化");
      this.initializeProp();
      this.$emit("closeModal");
    },
    stopEvent(event: Event) {
      event.stopPropagation();
    },
    initializeProp() {
      this.targetEmployee = {
        last_name: "",
        first_name: "",
        qualifications: [],
        restrictions: [],
        dependencies: [],
      };
    },

    updateQualifications(qualification: Qualification) {
      console.log(qualification);
      console.log(this.targetEmployee.qualifications);
      const index = this.targetEmployee.qualifications.findIndex(
        (q) => q.id === qualification.id
      );
      if (index > -1) {
        const array = this.targetEmployee.qualifications.filter(
          (qual) => qual !== qualification
        );
        this.targetEmployee.qualifications = array;
      } else {
        this.targetEmployee.qualifications.push(qualification);
      }
    },
    addRestrictionInput() {
      this.targetEmployee.restrictions.push({
        id: -1,
        name: "",
        value: 0,
      });
    },
    addDependency() {
      this.targetEmployee.dependencies.push({
        id: -1,
        first_name: "",
        last_name: "",
      });
    },
    removeRestriction(index: any) {
      this.targetEmployee.restrictions.splice(index, 1);
    },
    removeDependency(index: any) {
      this.targetEmployee.dependencies.splice(index, 1);
    },
    updateRestrictionName(index: number, selectedId: number) {
      const selectedRestriction = this.getRestrictions.find(
        (restriction: Restriction) => restriction.id === selectedId
      );
      if (selectedRestriction) {
        this.targetEmployee.restrictions[index].name = selectedRestriction.name;
      }
    },
    updateCaregiverName(index: number, selectedId: number) {
      const selectedCaregiver = this.getEmployees.find(
        (employee: Employee) => employee.id === selectedId
      );
      if (selectedCaregiver) {
        this.targetEmployee.dependencies[index].first_name =
          selectedCaregiver.first_name;
        this.targetEmployee.dependencies[index].last_name =
          selectedCaregiver.last_name;
      }
    },

    async registerNewEmployee() {
      console.log(this.targetEmployee);
      //   this.addEmployee(this.targetEmployee);
      // 親側でapi処理してもろて
      this.handleEmployee(this.targetEmployee);
      this.$emit("closeModal");
      this.initializeProp();

      // this.addEmployee(this.targetEmployee)
    },
  },
};
</script>

<template>
  <div id="overlay" @click="clickEvent">
    <div id="content" @click="stopEvent">
      <div class="mt-8 mb-8 text-left w-3/5">
        <div class="flex justify-between">
          <label class="text-2xl block mt-2 mb-4">{{ title }} </label>
          <button @click="clickEvent">cancel</button>
        </div>
        <div class="mb-8">
          <label class="text-sm block">姓 </label>

          <TextArea
            id="lastName"
            v-model="targetEmployee.last_name"
            placeholder="姓"
            type="text"
          ></TextArea>
        </div>
        <div class="mb-8">
          <label class="text-sm block">名 </label>
          <TextArea
            id="firstName"
            v-model="targetEmployee.first_name"
            placeholder="名"
            type="text"
          >
          </TextArea>
        </div>
        <div class="mt-4">
          <MiddleTitle title="資格情報"></MiddleTitle>
          <div
            class="flex items-center mb-8 mt-4"
            v-for="qualification in getQualifications"
            :key="qualification.id"
          >
            <CheckBox
              :key="qualification.id"
              :qualification="qualification"
              :qualified="targetEmployee.qualifications"
              :updateQualifications="updateQualifications"
            />
            <CheckLabel
              :for="`checkbox-${qualification.id}`"
              :title="qualification.name"
            ></CheckLabel>
          </div>
        </div>

        <hr />
        <div class="mb-4">
          <MiddleTitle title="制約条件"></MiddleTitle>
          <div class="mb-8">
            <div
              v-for="(existingRest, index) in targetEmployee.restrictions"
              :key="index"
            >
              <div class="flex justify-center">
                <div class="w-5/6 mt-2">
                  <!--  -->
                  <label class="text-base block mb-2"
                    >・制約条件{{ index + 1 }}
                  </label>
                  <div class="relative h-10 w-72 min-w-[200px]">
                    <select
                      id="underline_select"
                      v-model="existingRest.id"
                      @change="updateRestrictionName(index, existingRest.id)"
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                      <option
                        v-for="restriction in getRestrictions"
                        :key="restriction.id"
                        :value="restriction.id"
                      >
                        {{ restriction.name }}
                      </option>
                    </select>
                    <label
                      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      Select a restriction
                    </label>
                  </div>

                  <input
                    type="number"
                    class="w-28 py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                    v-model="existingRest.value"
                    placeholder="数値を入力"
                  />回まで
                  <div class="mt-2">
                    <RedWhiteButton
                      type="button"
                      :removeItem="removeRestriction"
                      :index="index"
                      label="ー 制約条件の削除"
                    >
                    </RedWhiteButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RedWhiteButton
            v-if="getRestrictions.length !== targetEmployee.restrictions.length"
            :addInput="addRestrictionInput"
            label="+ 制約条件の追加"
          >
          </RedWhiteButton>
        </div>

        <hr />

        <div class="mb-12">
          <MiddleTitle title="依存関係"></MiddleTitle>
          <div class="mb-8">
            <div
              v-for="(qual, index) in targetEmployee.dependencies"
              :key="index"
            >
              <div class="flex justify-center">
                <div class="w-5/6 mt-2">
                  <div class="mb-2 relative h-10 w-72 min-w-[200px]">
                    <select
                      id="underline_select"
                      v-model="qual.id"
                      @change="updateCaregiverName(index, qual.id)"
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    >
                      <option
                        v-for="employee in getEmployees"
                        :key="employee.id"
                        :value="employee.id"
                      >
                        {{ employee.last_name }} {{ employee.first_name }}
                      </option>
                    </select>
                    <label
                      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                      Select a dependency
                    </label>
                  </div>
                  <RedWhiteButton
                    type="button"
                    :removeItem="removeDependency"
                    :index="index"
                    label="ー 依存関係の削除"
                  >
                  </RedWhiteButton>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <RedWhiteButton
                :addInput="addDependency"
                label="+ 依存関係の追加"
              >
              </RedWhiteButton>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div>
            {{ message }}
          </div>

          <button
            class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-100"
            @click="registerNewEmployee"
            :disabled="!isValidNewEmployee"
          >
            {{ buttonTitle }}
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
