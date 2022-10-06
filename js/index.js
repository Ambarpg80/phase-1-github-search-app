document.addEventListener('DOMContentLoaded',(event)=>{
event.preventDefault()

/* 1- When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.  */

const form = document.querySelector('#github-form')
let search = document.querySelector('#search')
let userListUl = document.querySelector("#user-list")
let userListLi = document.createElement('li')
let repoUl = document.querySelector("#repos-list")
let repoLi = document.createElement('li')
let userImg = document.createElement('img')
 
form.addEventListener("submit", (event)=>{
    event.preventDefault()
    //FETCH USERS AND INFO
 fetch(`https://api.github.com/search/users?q=${search.value}`)
    //    method: 'GET',
    //     headers:{
    //         Accept : 'application/vnd.github.v3+json'
    //     },
    //     body: JSON.stringify()
   // })
    .then(response=>response.json())
    .then((users)=>{ userList(users) })
    
}) 

/* 2- Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)*/ 
function userList(users){
       for(const user of users.items){
   userListLi = document.createElement('li')
   //console.log(user)   
    userImg = document.createElement('img')
 userListLi.addEventListener("click", ()=>{
    console.log(`${user.login} has been clicked`)
    fetch(`https://api.github.com/users/${user.login}/repos`,{
       method: 'GET',
        headers:{
            Accept : 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
        })
    .then(response=>response.json())
    .then((repos)=>{ userRepos(repos) })

})
        userImg.src= `${user.avatar_url}`;
        userImg.style.height = "20";
        userImg.style.width = "20%";
        userImg.style.objectFit = "contain";
    userListLi.innerHTML = `${user.login}, <a href= ${user.html_url}>${user.html_url}</a>`
    userListLi.style.height = "5%";
    userListLi.style.width = "50%";
     userListLi.append(userImg)
     //let img = document.querySelectorAll('img')
    userListUl.append(userListLi)
     }
    } 

function userRepos(repos){
    repoUl.innerText = " ";
    for(const repo of repos){
        //console.log(repo)
    repoLi = document.createElement('li')
    repoLi.innerHTML = `${repo.name} , <a href= ${repo.html_url}>${repo.html_url}</a>`
    repoUl.append(repoLi)
    }
}




/* 3- Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.*/

/* 4- Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.*/


}) //DOM CONTETNT LOADED