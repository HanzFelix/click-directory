<script setup>
import { ref } from "vue";
import EditCard from "./EditCard.vue";
import { useCounterStore } from "../stores/counter.js";

const counterStore = useCounterStore();

const props = defineProps({
  id: { default: 0, type: Number },
  directory: {
    default: {
      id: 1,
      title: "Example",
      url: "https://example.com/",
      image: "../src/assets/default_bg_1.jpg",
    },
  },
});

const emit = defineEmits(["edit", "cancel"]);
const enableEdit = ref(false);
function showEditOverlay(bool) {
  enableEdit.value = bool;
  if (bool) {
    counterStore.loadDirectory(props.id);
    emit("edit");
  } else {
    emit("cancel");
  }
}
</script>
<template>
  <div
    class="transition-all group/z bg-cover bg-center rounded-xl h-full w-full"
    :style="{ 'background-image': 'url(' + directory.image + ')' }"
  >
    <a
      href="https://google.com/"
      class="card-url flex flex-col justify-between h-full"
      draggable="false"
    >
      <div>
        <button
          class="bg-slate-50 material-icons group-hover/z:opacity-100 opacity-0 m-3 hover:bg-slate-300 float-right rounded-md text-slate-600 px-1 aspect-square py-0 md:text-base shadow-sm transition-opacity shadow-slate-500"
          @click.self.prevent="showEditOverlay(true)"
        >
          edit
        </button>
      </div>
      <div
        class="bg-slate-900 bg-opacity-40 px-3 py-2 text-white rounded-b-xl group/x transition-all hover:bg-opacity-60"
      >
        <p class="font-semibold">{{ directory.title }}</p>
        <p
          class="max-h-0 text-sm truncate group-hover/x:max-h-min transition-height ease-in-out delay-200"
        >
          {{ directory.url }}
        </p>
      </div>
    </a>
  </div>
  <!--EditCard v-if="enableEdit" @cancel="showEditOverlay(false)" /-->
</template>
