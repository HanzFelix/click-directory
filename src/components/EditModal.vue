<script setup>
const emit = defineEmits(["update", "delete", "cancel"]);
function updateDir() {
  emit("update");
}
function deleteDir() {
  emit("delete");
}
</script>
<template>
  <form
    class="card-form card-add bg-cover bg-left bg-slate-300 h-full w-full flex flex-col justify-between md:justify-end pt-2 gap-2 rounded-2xl"
    id="edit-form"
    action="#"
    autocomplete="off"
  >
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl rou"> title </span>
      <input
        class="w-full py-1 px-2"
        type="text"
        name="title"
        id="edit-title"
        placeholder="Title"
        maxlength="64"
      />
    </div>
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl"> link </span>
      <input
        class="w-full py-1 px-2"
        type="url"
        name="url"
        id="edit-url"
        placeholder="URL"
      />
    </div>
    <div class="flex box-border gap-1.5 mx-4">
      <span class="material-icons text-slate-500 text-3xl"> wallpaper </span>
      <label
        class="bg-white w-full truncate py-1 px-2"
        for="edit-image"
        id="label-image"
        >Browse...</label
      >
      <input type="file" name="image" id="edit-image" hidden accept="image/*" />
    </div>
    <footer class="flex box-border h-8 gap-1.5 material-icons">
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
    </footer>
  </form>
</template>
