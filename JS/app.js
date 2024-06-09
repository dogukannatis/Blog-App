const fetchData = async () => {
    const main = document.querySelector("#main");
    const req = await fetch("http://127.0.0.1:3000/posts")
    const data = await req.json();
    console.log(data);

    let template = ``;

    data.forEach(post => {
        template += `<div class="card mb-3">
        <img src="data:image/jpeg;base64,${post.image}" class="card-img-top" alt="..." style="height: 300px;">
        <div class="card-body">
          <span class="badge badge-success mb-3">${post.label.toUpperCase()}</span>
          <h5 class="card-title mb-4"><a href="./blog-details.html?id=${post.id}" class="article-title">${post.title}</a></h5>
          <div class="row">
           
            <div class="col-sm">
              <p class="card-text"><small class="text-body-secondary">${post.author.username} - ${post.createdAt}</small></p>
            </div>
          
          
          </div>
         
        </div>
      </div>
        `
    });

    main.innerHTML = template;

}



window.addEventListener("DOMContentLoaded", fetchData);



const savePost = async (postData) => {

    try{
        const url = "http://127.0.0.1:3000/posts";
    const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    });

    const data = await req.json();
    console.log(data);
    window.location.href = './index.html';
      alert("Post has been published!");
    }catch(e){
        console.log(e);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('blogForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        //const label = document.getElementById('label').value;
        const imageFile = document.getElementById('image').files[0];
        const label = document.getElementById('label').value;
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        
        const reader = new FileReader();
        reader.onloadend = function() {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "").toString();
            userId = localStorage.getItem('userId');
            username = localStorage.getItem('username');
            postData = {
                "title" : title,
                "content" : content,
                "author" : {
                    "username" : username,
                    "id" : userId
                },
                "image" : base64String,
                "label" : label,
                "createdAt" : formattedDate
            },
        
           savePost(postData);
        };

        reader.readAsDataURL(imageFile);
       
    
    });
});





/*
 data.forEach(info => {
        template += `<div>
        <h3>${info.title}</h3>
        <p>${info.content.slice(0, 20)}</p>
        <a href='./details.html?id=${info.id}'>Read More</a>
        </div>
        `
    });
*/