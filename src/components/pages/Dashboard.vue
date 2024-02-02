<script lang="ts">
export default {
  name: "Dashboard",
  data() {},
};
</script>

<template>
  <section class="text-gray-900 h-ful bg-red-50">
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="lg:w-2/3 mx-auto">
        <router-link
          to="/"
          class="block hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div
            class="flex flex-wrap w-full bg-white py-32 px-10 relative mb-4 shadow-lg rounded-lg"
          >
            <div class="text-center relative z-10 w-full">
              <h2 class="text-4xl text-red-600 font-semibold title-font mb-2">
                シフト希望入力
              </h2>
              <p class="leading-relaxed text-lg">
                シフトの希望を入力しましょう
              </p>
            </div>
          </div>
        </router-link>
        <div class="flex flex-wrap -mx-2">
          <div class="px-2 w-1/2">
            <router-link
              to="/driver"
              class="block hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div
                class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative shadow-lg rounded-lg"
              >
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-red-600 font-medium title-font mb-2">
                    自動生成
                  </h2>
                  <p class="leading-relaxed">シフト希望の入力が完了したら</p>
                  <p class="leading-relaxed">
                    AIにシフトを作ってもらいましょう！
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="px-2 w-1/2">
            <router-link
              to="/driver"
              class="block hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div
                class="flex flex-wrap w-full bg-white sm:py-24 py-16 sm:px-10 px-6 relative shadow-lg rounded-lg"
              >
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-red-600 font-medium title-font mb-2">
                    従業員情報
                  </h2>
                  <p class="leading-relaxed">従業員情報・ドライバー情報の</p>
                  <p class="leading-relaxed">確認・登録・修正はこちら</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
