import { ref, computed } from "vue";
import { defineStore, mapActions } from "pinia";

const defaultDirectory = {
  title: "Example",
  url: "https://example.com/",
  image: "../src/assets/default_bg_1.jpg",
};

const defaultImages = [
  "../src/assets/default_bg_1.jpg",
  "../src/assets/default_bg_2.jpg",
  "../src/assets/default_bg_3.jpg",
  "../src/assets/default_bg_4.jpg",
];

export const useCounterStore = defineStore("counter", {
  state: () => ({
    currentId: 0,
    tempDirectory: {
      title: "",
      url: "",
      image: "none",
    },
    tempImageName: "Browse...",
    directories: localStorage.getItem("directories")
      ? JSON.parse(localStorage.getItem("directories"))
      : [defaultDirectory],
  }),
  getters: {
    defaultDirectory(state) {
      return defaultDirectory;
    },
  },
  actions: {
    createDirectory() {
      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, 64);

      if (this.tempDirectory.image == "none")
        this.tempDirectory.image =
          defaultImages[Math.floor(Math.random() * defaultImages.length)];

      // add directory and reset
      this.directories.push(this.tempDirectory);
      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
      this.tempImageName = "Browse...";
      localStorage.setItem("directories", JSON.stringify(this.directories));
    },
    loadDirectory(id) {
      this.currentId = id;
      this.tempDirectory = {
        title: this.directories[id].title,
        url: this.directories[id].url,
        image: this.directories[id].image,
      };
    },
    updateDirectory() {
      // self-correcting
      if (!this.tempDirectory.title)
        this.tempDirectory.title = this.tempDirectory.url
          .toString()
          .substring(0, 64);

      if (this.tempDirectory.image == "none")
        this.tempDirectory.image = getRandomArrayElement(defaultImages);

      // update directory and reset
      this.directories[this.currentId] = this.tempDirectory;
      this.tempDirectory = {
        title: "",
        url: "",
        image: "none",
      };
      this.tempImageName = "Browse...";
      localStorage.setItem("directories", JSON.stringify(this.directories));

      return true;
    },
    deleteDirectory() {
      this.directories.splice(this.currentId, 1);
      localStorage.setItem("directories", JSON.stringify(this.directories));
      return true;
    },
  },
});

//todo
//remove id in directory?
