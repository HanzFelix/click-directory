<script setup>
import { useCounterStore } from "../stores/counter";

const counterStore = useCounterStore();
const emit = defineEmits(["close"]);
const reader = new FileReader();

function updateDir() {
  if (counterStore.updateDirectory()) {
    emit("close");
  }
  // else error?
}
function deleteDir() {
  if (counterStore.deleteDirectory()) {
    emit("close");
  }
}

function loadImageFile(e) {
  let file = e.target.files[0];
  counterStore.tempImageName = file.name;
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    counterStore.tempDirectory.image = event.target.result;
  };
}
</script>
<template>
  <form
    class="card-form card-add flex h-full w-full flex-col justify-between gap-2 rounded-2xl pt-2 md:justify-end"
    id="edit-form"
    action="#"
    autocomplete="off"
  >
    <div class="mx-4 box-border flex gap-1.5">
      <span class="material-icons text-3xl text-slate-100 mix-blend-difference">
        title
      </span>
      <input
        class="w-full py-1 px-2"
        type="text"
        name="title"
        id="edit-title"
        placeholder="Title"
        :maxlength="counterStore.title_max_length"
        v-model="counterStore.tempDirectory.title"
      />
    </div>
    <div class="mx-4 box-border flex gap-1.5">
      <span class="material-icons text-3xl text-slate-100 mix-blend-difference">
        link
      </span>
      <input
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        placeholder="URL"
        v-model="counterStore.tempDirectory.url"
      />
    </div>
    <div class="mx-4 box-border flex">
      <span
        class="material-icons mr-1.5 text-3xl text-slate-100 mix-blend-difference"
      >
        {{ counterStore.imageSourceType[0].icon }}
      </span>
      <label
        v-show="counterStore.imageSourceType[0].source == 'upload'"
        class="w-full truncate bg-white py-1 px-2"
        for="edit-image"
        id="label-image"
      >
        {{ counterStore.tempImageName }}
      </label>
      <label
        v-show="counterStore.imageSourceType[0].source == 'random'"
        class="w-full truncate bg-white py-1 px-2"
        id="label-image"
      >
        {{ counterStore.imageSourceType[0].placeholder }}
      </label>
      <input
        v-show="counterStore.imageSourceType[0].source == 'url'"
        v-model="counterStore.tempDirectory.image"
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        :placeholder="counterStore.imageSourceType[0].placeholder"
      />
      <input
        type="file"
        name="image"
        id="edit-image"
        hidden
        accept="image/*"
        @change="loadImageFile($event)"
      />
      <button
        type="button"
        class="material-icons bg-white px-2 text-2xl text-slate-500"
        @click="counterStore.toggleImageSource('edit')"
      >
        flip_camera_android
      </button>
    </div>
    <footer class="material-icons box-border flex h-8">
      <button
        class="w-full bg-slate-300 text-green-600 transition-colors first:rounded-bl-xl last:rounded-br-xl hover:bg-green-600 hover:text-white"
        value="update"
        @click.stop.prevent="updateDir"
      >
        check
      </button>
      <button
        class="w-full bg-slate-300 text-red-600 transition-colors first:rounded-bl-xl last:rounded-br-xl hover:bg-red-600 hover:text-white"
        value="delete"
        @click.stop.prevent="deleteDir"
      >
        delete
      </button>
    </footer>
  </form>
</template>
