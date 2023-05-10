<script setup>
import { ref } from "vue";
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
function repositionDirectory(distance)
{
  counterStore.repositionDirectory(props.id, props.id + distance)
}
</script>
<template>
  <div
    class="transition-all group/z bg-cover bg-center rounded-xl h-full w-full bg-slate-300 overflow-hidden"
    :style="{ 'background-image': 'url(' + directory.image + ')' }"
  >
    <a
      :href="directory.url"
      class="card-url flex flex-col justify-end h-full"
      draggable="false"
    >
      <!--div>
        <button
          class="bg-slate-50 material-icons group-hover/z:opacity-100 opacity-0 m-3 hover:bg-slate-300 float-right rounded-md text-slate-600 px-1 aspect-square py-0 md:text-base shadow-sm transition-opacity shadow-slate-500"
          @click.self.prevent="showEditOverlay(true)"
        >
          edit
        </button>
      </div-->
      <div
        class="bg-slate-900 bg-opacity-40 px-3 py-2 text-slate-100 last:rounded-b-xl group/x transition-all"
        :class="counterStore.prevent_edit ? 'hover:bg-opacity-60' : ''"
      >
        <p class="font-semibold  leading-5"
        :class="counterStore.prevent_edit ? 'group-hover/x:truncate' : 'truncate'">{{ directory.title }}</p>
        <p
          class="max-h-0 text-sm truncate transition-height ease-in-out delay-200"
          :class="counterStore.prevent_edit ? 'group-hover/x:max-h-min' : ''"
        >
          {{ directory.url }}
        </p>
      </div>
      <div v-if="!counterStore.prevent_edit" class="material-icons flex text-slate-100 ">
        <button @click.self.prevent="repositionDirectory(-1)" class="w-full py-4 bg-slate-900 bg-opacity-40 hover:bg-opacity-60">chevron_left</button> 
        <button @click.self.prevent="showEditOverlay(true)" class="w-full py-4 bg-slate-900 bg-opacity-40 hover:bg-opacity-60">drive_file_rename_outline</button> 
        <button @click.self.prevent="repositionDirectory(1)" class="w-full py-4 bg-slate-900 bg-opacity-40 hover:bg-opacity-60">chevron_right</button>
      </div>
    </a>
  </div>
</template>
