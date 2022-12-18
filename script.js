var add = document.getElementById("add-btn");
const gridComputedStyle = getComputedStyle(document.getElementById("grid"));
var cardCount = 2;
add.style.order = cardCount+1;

function addCard() {
     var gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
     var gridColCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

     var v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     
     var a = document.createElement('a');
     a.href = "#";

     var cardBg = document.createElement('div');
     cardBg.classList.add("card-url");

     var btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.textContent = "•••"

     var p = document.createElement('p');
     p.textContent = "Very long title that exceeds a few lines"

     cardBg.appendChild(btnEdit)
     cardBg.appendChild(p)
     a.appendChild(cardBg)
     v.appendChild(a)

     document.getElementById('grid').appendChild(v);
     cardCount++;

     add.style.order = cardCount+1
     //add.classList.remove("add");
     //add.classList.add("add");
     // temp
}