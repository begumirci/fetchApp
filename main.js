const postList = document.querySelector('.post-list');
const userList = document.querySelector('.user-list');
const commentList = document.querySelector('.comment-list');
const dialogElement = document.querySelector('dialog');
const close = document.querySelector('.close');

/*
const myPost = (posts) => {
    posts.forEach(post => {
        postList.innerHTML += `
        <li class="post-item">
                <div class="post-information">
                    <h5 class="user-id">UserId: ${post.userId} </h5>
                    <h5 class="post-id">Id: ${post.id} </h5>
                    <h5 class="post-title">Title: ${post.title} </h5>
                    <h5 class="post-content">Content: ${post.body} </h5>
                </div>
                <button class="post-btn">Read more</button>
            </li>
        `
        
    });
}*/
close.addEventListener('click',closeDialog);
function closeDialog(){
    dialogElement.close();
}

function openDialog(){
    dialogElement.showModal();
}


fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
            postList.innerHTML += `
        <li class="post-item">
                <div class="post-information">
                    <h5 class="user-id unvisible">${post.userId} </h5>
                    <h5 class="post-id unvisible">${post.id} </h5>
                    <h5 class="post-title">Title: ${post.title} </h5>
                    <h5 class="post-content">Content: ${post.body} </h5>
                </div>
                <button class="post-btn">more</button>
            </li>
        `

       bindClick();   
       })
         
      })

      
      function bindClick(){
        for (const btn of document.querySelectorAll('.post-btn')) {
            btn.addEventListener('click',usersTeam)
            btn.addEventListener('click',openDialog)
        }
      }

    let Myusers;
    let Mycomments; 

      function usersTeam(e){
        Mycomments = '';

        let usersId = e.target.parentElement.children[0].children[0].innerText;
        let postid = e.target.parentElement.children[0].children[1].innerText;
        

         fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(users => {
            Myusers = users.find(x => x.id == usersId)
            userList.innerText = '';
            console.log(userList);
            userList.innerHTML = `
            <div class="user-inform">
                <h5 class="user-name">Author Name: ${Myusers.name} </h5>
                <h5 class="user-title">Username: ${Myusers.username} </h5>
                <h5 class="user-mail">E-mail: ${Myusers.email} </h5>
            </div>`
         })
        
         fetch('https://jsonplaceholder.typicode.com/comments')
         .then(response => response.json())
         .then(comments =>{
            commentList.innerText= '';
            for (const yorum of comments) {
                if(yorum.postId == postid){
                    commentList.innerHTML += `
                  <li class="comment-item">
                    <h5 class="comment-name">Comment name: ${yorum.name}</h5>
                    <h5 class="comment-mail">E-mail: ${yorum.email}</h5>
                    <h5 class="comment-content">Comment: ${yorum.body}</h5>
                  </li>`
                }
            }
            })
            
         }

        

        
            
            
            
            
            