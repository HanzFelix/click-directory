// @ts-check
// Elements
var addCard;
var addForm;
var editForm;
var titleInput;
var urlInput;
var imageLabel;
var imageInput;
var titleEdit;
var urlEdit;
var imageEdit;
var cardGrid;

// Values
var cardCount;
var addImage;
var editImage;
var directories = [];
var curIndex;

const reader = new FileReader();

function init()
{
     addCard = document.getElementById("add-card");
     addForm = document.getElementById("add-form");
     editForm = document.getElementById("edit-form");
     titleInput = document.getElementById("input-title");
     urlInput = document.getElementById("input-url");
     imageLabel = document.getElementById("label-image");
     imageInput = document.getElementById("input-image");
     titleEdit = document.getElementById("edit-title");
     urlEdit = document.getElementById("edit-url");
     imageEdit = document.getElementById("edit-image");
     cardGrid = document.getElementById('grid')

     if (!localStorage.getItem('directories')) {
          initDefaultDirectories();
     } else {
          loadDirectories();
     }

     cardCount = 0;
     for (let i = 0; i < directories.length; i++) {
          document.getElementById('grid').appendChild(createDirectoryCard(directories[i], i));
          cardCount++;
     }

     addImage = "none";
     addCard.style.order = (cardCount+1).toString();
     
     // convert image file to base64 string on load of image
     reader.addEventListener("load", function(e) {
          addImage = reader.result;
     });

     addForm.addEventListener("submit", function(e) { createDirectory(e) })
     editForm.addEventListener("submit", function(e) { editDirectory(e) })
     imageEdit.addEventListener("change", function() { updateImageDisplay(this) })
     imageInput.addEventListener("change", function() { updateImageDisplay(this) })

     hideEditOverlay()
}

function initDefaultDirectories() {
     directories.push(new Directory("Google", "https://www.google.com/"));
     directories.push(new Directory("Discord", "https://discord.com/"));

     localStorage.setItem('directories', JSON.stringify(directories));
}

function loadDirectories() {
     directories = JSON.parse(localStorage.getItem('directories'))
}

function deleteLocalStorage() {
     localStorage.clear()
}

function createDirectoryCard(dir, index)
{
     // Construct New Card
     let v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     //v.draggable = true;
     if (addImage != "none")
          v.style.backgroundImage = "url(" + dir.image + ")";

     let btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.classList.add("material-icons");
     btnEdit.textContent = "edit";
     btnEdit.dataset.index = index;
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
     let formData = new FormData(e.target);
     let title = formData.get("title");
     let url = formData.get("url");

     if (!url)
          return

     if (!title)
          title = url.toString().substring(0, 64);

     let newDir = addImage != "none" ? new Directory(title, url, addImage) : new Directory(title, url);
     directories.push(newDir);
     localStorage.setItem('directories', JSON.stringify(directories));

     cardGrid.appendChild(createDirectoryCard(newDir, cardCount));
     cardCount++;

     resetForm(addForm)
     addCard.style.order = cardCount+1;
}

function resetForm(form) {
     form.reset()
     addImage = "none";
     editImage = "none";
     form.style.backgroundImage = "none";
     form.querySelector("label").textContent = "Browse...";
}

function updateImageDisplay(input) {
     let file = input.files[0];
     reader.readAsDataURL(file);
     input.parentElement.parentElement.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
     input.previousElementSibling.textContent = file.name;
}

function showEditOverlay(button)
{
     hideEditOverlay();
     //button.parentElement.prepend(editCard);
     button.parentElement.insertBefore(editForm, button);
     curIndex = button.dataset.index;
     titleEdit.value = directories[curIndex].title;
     urlEdit.value = directories[curIndex].url;
     addImage = directories[curIndex].image;
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
               deleteDirectory();
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

     let newDir = addImage != "none" ? new Directory(title, url, addImage) : new Directory(title, url);
     directories[curIndex] = newDir;
     form.parentElement.replaceWith(createDirectoryCard(newDir, curIndex));
     localStorage.setItem('directories', JSON.stringify(directories));
     hideEditOverlay();
     form.reset();
}

function deleteDirectory(params) {
     alert("delete")
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
     alert("load")
}

class Directory {
     constructor(title, url, image = "test_image.jpg") {
          this.title = title;
          this.url = url;
          this.image = image;

          this.backgroundImage = function () {
               return "url(" + this.image + ")";
          };
     }
}

init();


/* 
TODO
delete unnecessary elements selected from id, especially forms
turn off history in form input
still can't update image background
delete directory safely
*/