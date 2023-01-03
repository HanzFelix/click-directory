// @ts-check
// Elements
var add;
var addCard;
var editCard;
var titleInput;
var urlInput;
var imageLabel;
var imageInput;
var titleEdit;
var urlEdit;
var imageEdit;

// Values
var cardCount;
var bgImage;
var directories = [];
var curIndex;

const reader = new FileReader();

function init()
{
     add = document.getElementById("add-card");
     addCard = document.getElementById("add-card-bg");
     editCard = document.getElementById("edit-card");
     titleInput = document.getElementById("input-title");
     urlInput = document.getElementById("input-url");
     imageLabel = document.getElementById("label-image");
     imageInput = document.getElementById("input-image");
     titleEdit = document.getElementById("edit-title");
     urlEdit = document.getElementById("edit-url");
     imageEdit = document.getElementById("edit-image");

     directories.push(new Directory("Google", "https://www.google.com/"));
     directories.push(new Directory("Discord", "https://discord.com/"));

     cardCount = 0;
     for (let i = 0; i < directories.length; i++) {
          document.getElementById('grid').appendChild(createDirectoryCard(directories[i], i));
          cardCount++;
     }

     bgImage = "none";
     add.style.order = (cardCount+1).toString();
     
     // convert image file to base64 string on load of image
     reader.addEventListener("load", function(e) {
          bgImage = reader.result;
     });

     addCard.addEventListener("submit", function(e) { createDirectory(e) })
     editCard.addEventListener("submit", function(e) { editDirectory(e) })
     imageEdit.addEventListener("change", function() { updateImageDisplay(this) })
     imageInput.addEventListener("change", function() { updateImageDisplay(this) })

     hideEditOverlay()
}

function createDirectoryCard(dir, index)
{
     // Construct New Card
     let v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     //v.draggable = true;
     if (bgImage != "none")
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
     let titleText = titleInput.value;
     let urlText = urlInput.value;

     if (!urlText)
          return

     if (!titleText)
          titleText = urlText;

     let newDir = bgImage != "none" ? new Directory(titleText, urlText, bgImage) : new Directory(titleText, urlText);
     directories.push(newDir);

     document.getElementById('grid').appendChild(createDirectoryCard(newDir, cardCount));
     cardCount++;

     resetAddCard()
     add.style.order = cardCount+1;
}

function resetAddCard() {
     titleInput.value = "";
     urlInput.value = "";
     bgImage = "none";
     addCard.style.backgroundImage = bgImage;
     imageLabel.textContent = "Browse...";
}

function updateImageDisplay(input) {
     let file = input.files[0];
     reader.readAsDataURL(file);
     input.parentElement.parentElement.style.backgroundImage = "url("+URL.createObjectURL(file)+")";
     input.previousElementSibling.textContent = file.name; // TODO change to image label of 
}

function showEditOverlay(button)
{
     hideEditOverlay();
     //button.parentElement.prepend(editCard);
     button.parentElement.insertBefore(editCard, button);
     curIndex = button.dataset.index;
     titleEdit.value = directories[curIndex].title;
     urlEdit.value = directories[curIndex].url;
     editCard.classList.remove("gone");
     // TODO get the current image
}

function hideEditOverlay() {
    // editCard.remove();
    editCard.classList.add("gone");
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
          title = url;

     let newDir = bgImage != "none" ? new Directory(title, url, bgImage) : new Directory(title, url);
     directories[curIndex] = newDir;
     form.parentElement.replaceWith(createDirectoryCard(newDir, curIndex))
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


/* get name
const check = (e) => {
    const form = new FormData(e.target);
    const formula = form.get("formula");
    console.log(formula);
    return false
};


TODO
delete unnecessary elements selected from id, especially forms
turn off history in form input
still can't update image background
*/