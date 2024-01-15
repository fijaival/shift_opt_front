<script lang="ts">
export default {
  name: "Dashboard",
  data() {},
};
</script>

<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="lg:w-2/3 mx-auto">
        <router-link class="mr-5 hover:text-gray-900" to="/">
          <div
            class="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4"
          >
            <img
              alt="gallery"
              class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
              src="../../../public/ffaaaa.png"
            />
            <div class="text-center relative z-10 w-full">
              <h2 class="text-4xl text-gray-900 font-medium title-font mb-2">
                シフト希望入力
              </h2>

              <p class="leading-relaxed text-xl">
                シフトの希望を入力しましょう
              </p>
            </div>
          </div>
        </router-link>
        <div class="flex flex-wrap -mx-2">
          <div class="px-2 w-1/2">
            <router-link class="mr-5 hover:text-gray-900" to="/driver">
              <div
                class="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative"
              >
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="../../../public/ffaaaa.png"
                />
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-gray-900 font-medium title-font mb-2">
                    自動生成
                  </h2>
                  <p class="leading-relaxed">シフト希望の入力が完了したら</p>
                  <p class="leading-relaxed inline-flex">
                    AIにシフトを作ってもらいましょう！
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="px-2 w-1/2">
            <router-link class="mr-5 hover:text-gray-900" to="/driver">
              <div
                class="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative"
              >
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="../../../public/ffaaaa.png"
                />
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-gray-900 font-medium title-font mb-2">
                    従業員情報
                  </h2>
                  <p class="leading-relaxed">従業員情報・ドライバー情報の</p>
                  <p class="leading-relaxed inline-flex">
                    確認・登録・修正はこちら
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  rinchan
</template>
