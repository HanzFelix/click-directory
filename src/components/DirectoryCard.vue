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
function repositionDirectory(distance) {
  counterStore.repositionDirectory(props.id, props.id + distance);
}
</script>
<template>
  <div
    class="group/z h-full w-full overflow-hidden rounded-xl bg-slate-300 bg-cover bg-center transition-all"
    :style="{ 'background-image': 'url(' + directory.image + ')' }"
  >
    <a
      :href="directory.url"
      class="card-url flex h-full flex-col justify-end"
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
        class="group/x bg-slate-900 bg-opacity-40 px-3 py-2 text-slate-100 transition-all last:rounded-b-xl"
        :class="counterStore.prevent_edit ? 'hover:bg-opacity-60' : ''"
      >
        <p
          class="font-semibold leading-5"
          :class="
            counterStore.prevent_edit ? 'group-hover/x:truncate' : 'truncate'
          "
        >
          {{ directory.title }}
        </p>
        <p
          class="max-h-0 truncate text-sm transition-height delay-200 ease-in-out"
          :class="counterStore.prevent_edit ? 'group-hover/x:max-h-min' : ''"
        >
          {{ directory.url }}
        </p>
      </div>
      <div
        v-if="!counterStore.prevent_edit"
        class="material-icons flex border-t-[3px] border-slate-400 border-opacity-60 text-slate-100"
      >
        <button
          @click.self.prevent="repositionDirectory(-1)"
          class="w-full bg-slate-900 bg-opacity-50 py-2 hover:bg-opacity-70"
        >
          chevron_left
        </button>
        <button
          @click.self.prevent="showEditOverlay(true)"
          class="w-full bg-slate-900 bg-opacity-50 py-2 hover:bg-opacity-70"
        >
          drive_file_rename_outline
        </button>
        <button
          @click.self.prevent="repositionDirectory(1)"
          class="w-full bg-slate-900 bg-opacity-50 py-2 hover:bg-opacity-70"
        >
          chevron_right
        </button>
      </div>
    </a>
  </div>
</template>
