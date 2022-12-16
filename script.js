function addCard() {
     var v = document.createElement('div');
     v.classList.add("card");
     v.classList.add("new-card");
     
     var a = document.createElement('a');
     a.href = "#";

     var cardBg = document.createElement('div');
     cardBg.classList.add("card-bg");

     var btnEdit = document.createElement('button');
     btnEdit.classList.add("edit-button");
     btnEdit.classList.add("hidden");
     btnEdit.textContent = "edit"

     var p = document.createElement('p');
     p.textContent = "Hello"
     
     cardBg.appendChild(btnEdit)
     cardBg.appendChild(p)
     a.appendChild(cardBg)
     v.appendChild(a)

     document.getElementById('container').appendChild(v);
}