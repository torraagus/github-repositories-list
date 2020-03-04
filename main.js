var url = `https://api.github.com/repositories`;

document.addEventListener("DOMContentLoaded", function(event) {
    getRepositories();
})

function getRepositories() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let ul = document.getElementById('repoList');
        data.forEach(repo => {
            var li = document.createElement("li");
            var avatar = document.createElement("img");
            var repo_name = document.createElement("p");
            avatar.setAttribute('src', `${repo.owner.avatar_url}`);
            repo_name.innerHTML = repo.full_name;
            li.appendChild(avatar);
            li.appendChild(repo_name);
            ul.appendChild(li);
        });
        console.log(data);
    }) 
    .catch(err => console.log(err))
}

