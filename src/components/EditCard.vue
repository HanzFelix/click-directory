<script setup>
const emit = defineEmits(["update", "delete", "cancel"]);
function updateDir() {
  emit("update");
}
function deleteDir() {
  emit("delete");
}
function exitEdit() {
  emit("cancel");
}
</script>
<template>
  <form
    class="card-form card-add bg-cover bg-left bg-slate-300 h-full w-full hidden md:flex flex-col justify-end pt-3 gap-1 rounded-xl"
    id="edit-form"
    action="#"
    autocomplete="off"
  >
    <div class="flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> title </span>
      <input
        class="w-full px-1"
        type="text"
        name="title"
        id="edit-title"
        placeholder="Title"
        maxlength="64"
      />
    </div>
    <div class="row flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> link </span>
      <input
        class="w-full px-1"
        type="url"
        name="url"
        id="edit-url"
        placeholder="URL"
      />
    </div>
    <div class="row flex box-border gap-1.5 mx-2">
      <span class="material-icons text-slate-500"> wallpaper </span>
      <label
        class="bg-white w-full truncate px-1"
        for="edit-image"
        id="label-image"
        >Browse...</label
      >
      <input type="file" name="image" id="edit-image" hidden accept="image/*" />
    </div>
    <div class="row button-row flex box-border gap-1.5 material-icons">
      <button
        class="w-full text-green-600 hover:bg-green-600 hover:text-white first:rounded-bl-xl last:rounded-br-xl"
        value="update"
        @click="updateDir"
      >
        check
      </button>
      <button
        class="w-full text-red-600 hover:bg-red-600 hover:text-white first:rounded-bl-xl last:rounded-br-xl"
        value="delete"
        @click="deleteDir"
      >
        delete
      </button>
      <button
        class="w-full text-slate-600 hover:bg-slate-600 hover:text-white first:rounded-bl-xl last:rounded-br-xl"
        value="cancel"
        type="button"
        @click="exitEdit"
      >
        close
      </button>
    </div>
  </form>
</template>
