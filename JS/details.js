const fetchData = async () => {
    const details = document.querySelector("#details");
    const id = new URLSearchParams(window.location.search).get("id");
    const req = await fetch("http://127.0.0.1:3000/posts/" + id)
    const data = await req.json();
    console.log(data);

    let template = `
     <div>
    <span class="badge badge-success mb-3">${data.label.toUpperCase()}</span>
    <h5 class="mb-4" style="font-size: 32px;">${data.title}</h5>
    <div class="row">
     
      <div class="col-sm">
        <p class="card-text"><small class="text-body-secondary">${data.author.username} - ${data.createdAt}</small></p>
      </div>
    
    
    </div>
    <div class="mb-4"></div>
    <img src="data:image/jpeg;base64,${data.image}" class="card-img-top" alt="..." style="height: 500px;">
    <div class="mb-4"></div>

    <p>${data.content}</p>
    `;

    details.innerHTML = template;

    userId = localStorage.getItem('userId');

    if (userId === data.author.id) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deletePost(data.id);
        };
        details.appendChild(deleteButton);
    }

    

}

window.addEventListener("DOMContentLoaded", fetchData);

const deletePost = async (id) => {
    
  try{
      //const id = new URLSearchParams(window.location.search).get("id");
      const url = "http://127.0.0.1:3000/posts/" + id;
      const req = await fetch(url, {
          method: "DELETE",
          headers: {
              Accept: "Application/json",
              "Content-Type": "Application/json"
          }
      });

      const data = await req.json();
      console.log(data);
      window.location.href = './index.html';
      alert("Post has been deleted!");
  }catch(e){
      console.log(e);
  }
  


}

