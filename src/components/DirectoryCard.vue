<script setup>
import { ref } from "vue";
import EditCard from "./EditCard.vue";
const enableEdit = ref(false);
function showEditOverlay(bool) {
  enableEdit.value = bool;
}
</script>
<template>
  <div
    v-if="!enableEdit"
    class="transition-all group/z bg-cover bg-center rounded-xl h-full w-full"
    style="background-image: url('./src/assets/default_bg_1.jpg')"
  >
    <a
      href="https://google.com/"
      class="card-url flex flex-col justify-between h-full"
      draggable="false"
    >
      <div>
        <button
          class="bg-slate-50 material-icons group-hover/z:opacity-100 opacity-0 m-3 float-right rounded-md text-slate-600 px-1 aspect-square py-0 md:text-base shadow-sm"
          @click.self.prevent="showEditOverlay(true)"
        >
          edit
        </button>
      </div>
      <div
        class="bg-slate-900 bg-opacity-40 px-3 py-2 text-white rounded-b-xl group/x"
      >
        <p class="font-semibold">Google.com</p>
        <p
          class="h-0 text-sm truncate group-hover/x:h-min transition-all ease-in-out delay-200"
        >
          https://google.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </div>
    </a>
  </div>
  <EditCard v-if="enableEdit" @cancel="showEditOverlay(false)" />
</template>
