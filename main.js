const postList = document.querySelector('.post-list');
const userList = document.querySelector('.user-list');
const commentList = document.querySelector('.comment-list');
const dialogElement = document.querySelector('dialog');
const close = document.querySelector('.close');

const prefix = 'https://jsonplaceholder.typicode.com/';

let posts = [];
let users = [];

close.addEventListener('click',closeDialog);
function closeDialog(){
    dialogElement.close();
}

function openDialog(){
    dialogElement.showModal();
    commentLoad(this.dataset.postid)
}

async function commentLoad(postId){

  let commentDetail = await fetch(`${prefix}posts/${postId}/comments`).then(x => x.json());
  showDetail(commentDetail);
}

function showDetail(commentDetail) {

  commentList.innerHTML = '';

  for (const comment of commentDetail) {

    commentList.innerHTML += `
               <li class="comment-item">
                    <h5 class="comment-name">Comment name: ${comment.name} </h5>
                    <h5 class="comment-mail">E-mail: ${comment.email} </h5>
                    <h5 class="comment-content">Comment: ${comment.body} </h5>
                </li> 
    `
  }

}

async function dataLoad(){
  posts = await fetch(`${prefix}posts`).then(x => x.json());
  users = await fetch(`${prefix}users`).then(x => x.json());
  
  render();
}

function render(){
  for (const post of posts) {
    let writer = users.find(x => x.id === post.userId)
    postList.innerHTML += `
    <li class="post-item">
                <div class="post-inform">
                  <div class="post-writer">
                    <h5 class="user-name">Writer: ${writer.name} </h5>
                    <h5 class="user-title">Username: ${writer.username}</h5>
                    <h5 class="user-mail">E-mail: ${writer.email} </h5>
                  </div>
                    <h5 class="post-title">Title: ${post.title} </h5>
                    <h5 class="post-content">Content: ${post.body} </h5>
                    <div class="post-btn-konum">
                    <button data-postid ="${post.id}" class="post-btn">more</button>
                    </div>
                </div>
            </li>
    `
  }
  bindClick();
}

function bindClick(){
  for (const btn of document.querySelectorAll('.post-btn')) {
    btn.addEventListener('click',openDialog)
  }
}

        
dataLoad();            
            
            
            
            