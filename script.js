// @ts-check
// Elements
var addCard;
var addForm;
var editForm;
var imageInput;
var titleEdit;
var urlEdit;
var imageEdit;
var cardGrid;

// Values
var cardCount;
var addImage;
var editImage;
var curIndex;
var curFileRead;

// Arrays
var defaultImages;
var directories = [];


const reader = new FileReader();

function init()
{
     addCard = document.getElementById("add-card");
     addForm = document.getElementById("add-form");
     editForm = document.getElementById("edit-form");
     imageInput = document.getElementById("input-image");
     titleEdit = document.getElementById("edit-title");
     urlEdit = document.getElementById("edit-url");
     imageEdit = document.getElementById("edit-image");
     cardGrid = document.getElementById('grid');

     defaultImages = [
          "img/default_bg_1.jpg", 
          "img/default_bg_2.jpg", 
          "img/default_bg_3.jpg", 
          "img/default_bg_4.jpg"
     ]

     if (!localStorage.getItem('directories')) {
          initDefaultDirectories();
     } else {
          loadDirectories();
     }

     initDirectoryCards()

     addImage = "none";
     addCard.style.order = (cardCount+1).toString();
     
     // convert image file to base64 string on load of image
     reader.addEventListener("load", function(e) {
          console.log(curFileRead)
          switch (curFileRead) {
               case "input-image":
                    addImage = reader.result;
                    break;
               case "edit-image":
                    editImage = reader.result;
                    break;
               default:
                    break;
          }
          
     });

     addForm.addEventListener("submit", function(e) { createDirectory(e) })
     editForm.addEventListener("submit", function(e) { editDirectory(e) })
     imageEdit.addEventListener("change", function(e) { updateImageDisplay(e) })
     imageInput.addEventListener("change", function(e) { updateImageDisplay(e) })

     hideEditOverlay()
}

function initDefaultDirectories() {
     directories.push(new Directory(1, "Example", "https://example.com/", getRandomArrayElement(defaultImages)));

     localStorage.setItem('directories', JSON.stringify(directories));
}

function loadDirectories() {
     directories = JSON.parse(localStorage.getItem('directories'))
}

function deleteLocalStorage() {
     localStorage.clear()
}

function createDirectoryCard(dir)
{
     // Construct New Card
     let v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     v.style.backgroundImage = "url(" + dir.image + ")";

     let btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.classList.add("material-icons");
     btnEdit.textContent = "edit";
     btnEdit.dataset.id = dir.id;
     btnEdit.addEventListener("click", function() { showEditOverlay(this) });
     
     let a = document.createElement('a');
     a.classList.add("card-url");
     a.href = dir.url;
     

     let emptyDiv = document.createElement('div');

     let p = document.createElement('p');
     p.textContent = dir.title;

     let br = document.createElement('br');

     let span = document.createElement('span');
     span.textContent = dir.url;

     v.appendChild(btnEdit);
     v.appendChild(a);
     a.appendChild(emptyDiv);
     a.appendChild(p);
     p.appendChild(br);
     p.appendChild(span);

     return v;
}

function createDirectory(e) {
     e.preventDefault()
     
     // Prepare values
     let id = directories[directories.length - 1].id + 1;

     let formData = new FormData(e.target);
     let title = formData.get("title");
     let url = formData.get("url");

     if (!url)
          return

     if (!title)
          title = url.toString().substring(0, 64);

     let newDir = addImage != "none" ? new Directory(id, title, url, addImage) : new Directory(id, title, url, getRandomArrayElement(defaultImages));
     directories.push(newDir);
     localStorage.setItem('directories', JSON.stringify(directories));

     cardGrid.appendChild(createDirectoryCard(newDir));
     cardCount++;

     resetForm(addForm)
     addCard.style.order = cardCount+1;
}

function initDirectoryCards() {
     cardCount = 0;
     for (let i = 0; i < directories.length; i++) {
          document.getElementById('grid').appendChild(createDirectoryCard(directories[i]));
          cardCount++;
     }
}

function resetForm(form) {
     form.reset()
     addImage = "none";
     editImage = "none";
     form.style.backgroundImage = "none";
     form.querySelector("label").textContent = "Browse...";
}

function updateImageDisplay(e) {
     let file = e.target.files[0];
     curFileRead = e.target.id;
     reader.readAsDataURL(file);
     e.target.parentElement.parentElement.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
     e.target.previousElementSibling.textContent = file.name;
}

function showEditOverlay(button)
{
     hideEditOverlay();
     button.parentElement.insertBefore(editForm, button);
     curIndex = directories.findIndex(dir => dir.id == button.dataset.id);
     titleEdit.value = directories[curIndex].title;
     urlEdit.value = directories[curIndex].url;
     editImage = directories[curIndex].image;
     editForm.classList.remove("gone");
}

function hideEditOverlay() {
    editForm.remove();
    editForm.classList.add("gone");
    resetForm(editForm)
}

function editDirectory(e) {
     e.preventDefault()
     switch (e.submitter.value) {
          case "update":
               updateDirectory(e.target);
               break;
          case "delete":
               deleteDirectory(e.target);
               break;
          case "cancel":
               hideEditOverlay()
               break;
          default:
               break;
     }
}

function updateDirectory(form) {
     let formData = new FormData(form);
     let title = formData.get("title");
     let url = formData.get("url");

     if (!url)
          return false;

     if (!title)
          title = url.toString().substring(0, 64);

     directories[curIndex].title = title;
     directories[curIndex].url = url;
     directories[curIndex].image = editImage != "none" ? editImage : getRandomArrayElement(defaultImages);

     form.parentElement.replaceWith(createDirectoryCard(directories[curIndex]));
     localStorage.setItem('directories', JSON.stringify(directories));
     hideEditOverlay();
     form.reset();
}

function deleteDirectory(form) {
     directories.splice(curIndex, 1);
     form.parentElement.remove();
     localStorage.setItem('directories', JSON.stringify(directories));
}

function saveToJsonFile()
{
     let dataStr = JSON.stringify(directories);
     let dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

     let fileName = "click_directory_backup.json";

     let linkElement = document.createElement('a');
     linkElement.setAttribute('href', dataUri);
     linkElement.setAttribute('download', fileName);
     linkElement.click();
}

function loadFromJsonFile()
{
     // TODO: Implement load from json
     alert("load")
     return;

     location.reload()
}

function getRandomArrayElement(arr)
{
     if (arr && arr.length)
          return arr[Math.floor(Math.random() * arr.length)];
}

class Directory {
     constructor(id, title, url, image) {
          this.id = id;
          this.title = title;
          this.url = url;
          this.image = image;
     }
}

init();


/* 
TODO
delete unnecessary elements selected from id, especially forms

delete directory safely:
Directory.id = directories[last].id++

*/